import React from "react";
import _ from "lodash";
import { compose } from "recompose";
import { withApollo } from "react-apollo";

import { TermAgg, RangeAgg } from "@arranger/components/dist/Aggs";
import {
  inCurrentSQON,
  currentFieldValue
} from "@arranger/components/dist/SQONView/utils";

import { namespaceField } from "@capsid/utils";

const parseAggs = ({
  field,
  type,
  aggs,
  globalField = `${field}:global`,
  filteredField = `${field}:filtered`
}) => {
  if (!aggs) return {};
  const aggRoot = aggs[globalField]
    ? aggs[globalField][filteredField] || aggs[globalField]
    : aggs;
  return type === "stats"
    ? { stats: aggRoot[`${field}:stats`] }
    : aggRoot[field];
};

const enhance = compose(withApollo);

const AggPanel = ({ client, config, search, sqon, updateSQON, aggData }) => (
  <div>
    {_.flatten(
      Object.keys(config).map(k => config[k].map(x => ({ ...x, entity: k })))
    ).map(
      ({
        displayName,
        entity,
        field,
        type,
        isPercentage,
        showExclude,
        namespacedField = namespaceField({ entity, field }),
        data = parseAggs({
          field,
          type,
          aggs: (aggData[namespacedField] || search[entity] || {}).aggs
        }),
        shouldStripBucketCounts = !(aggData[namespacedField] || {}).aggs,
        key = JSON.stringify({ namespacedField, data })
      }) =>
        type === "terms" ? (
          <TermAgg
            key={key}
            field={namespacedField}
            displayName={displayName}
            buckets={
              data.buckets && shouldStripBucketCounts
                ? data.buckets.map(({ key }) => ({ key }))
                : data.buckets
            }
            isExclude={d =>
              !!currentFieldValue({ sqon, dotField: d.field, op: "not-in" })
            }
            showExcludeOption={showExclude}
            handleIncludeExcludeChange={({ generateNextSQON }) =>
              updateSQON(generateNextSQON(sqon))
            }
            isActive={d =>
              inCurrentSQON({
                value: d.value,
                dotField: d.field,
                currentSQON: sqon
              })
            }
            handleValueClick={({ generateNextSQON }) =>
              updateSQON(generateNextSQON(sqon))
            }
          />
        ) : (
          <RangeAgg
            key={key}
            field={namespacedField}
            displayName={displayName}
            stats={data.stats || {}}
            {...isPercentage && {
              step: 0.01,
              formatLabel: value => Math.round(value * 100) / 100
            }}
            value={{
              min:
                currentFieldValue({
                  sqon,
                  dotField: namespacedField,
                  op: ">="
                }) || (data.stats || {}).min,
              max:
                currentFieldValue({
                  sqon,
                  dotField: namespacedField,
                  op: "<="
                }) || (data.stats || {}).max
            }}
            handleChange={({ generateNextSQON }) =>
              updateSQON(generateNextSQON(sqon))
            }
          />
        )
    )}
  </div>
);

export default enhance(AggPanel);
