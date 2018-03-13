import React from "react";
import _ from "lodash";

import { TermAgg, RangeAgg } from "@arranger/components/dist/Aggs";
import {
  inCurrentSQON,
  currentFieldValue
} from "@arranger/components/dist/SQONView/utils";

const aggDataFromSearch = ({ config, entity, field, search, type }) => {
  const aggs = search[entity].aggs;
  if (!aggs) return {};
  const aggRoot = aggs[`${field}:global`]
    ? aggs[`${field}:global`][`${field}:filtered`]
    : aggs;
  return aggRoot[type === "stats" ? `${field}:stats` : field];
};

const AggPanel = ({ config, search, sqon, updateSQON }) => (
  <div>
    {_.flatten(
      Object.keys(config).map(k => config[k].map(x => ({ ...x, entity: k })))
    ).map(
      ({
        displayName,
        entity,
        field,
        type,
        namespacedField = `${entity}.${field}`,
        data = aggDataFromSearch({ config, entity, field, search, type }) || {},
        key = JSON.stringify({ namespacedField, data })
      }) =>
        type === "terms" ? (
          <TermAgg
            key={key}
            field={namespacedField}
            displayName={displayName}
            buckets={data.buckets}
            handleValueClick={({ generateNextSQON }) =>
              updateSQON(generateNextSQON(sqon))
            }
            isActive={d =>
              inCurrentSQON({
                value: d.value,
                dotField: d.field,
                currentSQON: sqon
              })
            }
          />
        ) : (
          <RangeAgg
            key={key}
            field={namespacedField}
            displayName={displayName}
            stats={data}
            value={{
              min:
                currentFieldValue({
                  sqon,
                  dotField: namespacedField,
                  op: ">="
                }) || data.min,
              max:
                currentFieldValue({
                  sqon,
                  dotField: namespacedField,
                  op: "<="
                }) || data.max
            }}
            handleChange={({ generateNextSQON }) =>
              updateSQON(generateNextSQON(sqon))
            }
          />
        )
    )}
  </div>
);

export default AggPanel;
