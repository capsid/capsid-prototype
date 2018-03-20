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

const parseData = ({ data: { stats, ...data } }) => {
  if (!stats) return data;
  return {
    stats: Object.keys(stats).reduce((obj, k) => ({
      ...obj,
      [k]:
        stats[k] > 0 && stats[k] < 1
          ? Math.round(stats[k] * 100) / 100
          : stats[k]
    }))
  };
};

const enhance = compose(withApollo);

const AggPanel = ({
  client,
  config,
  search,
  sqon,
  updateSQON,
  aggData,
  loading
}) => (
  <div style={{ position: "relative" }}>
    {loading && (
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          backgroundColor: "gray",
          height: "100%",
          width: "100%",
          opacity: 0.5
        }}
      />
    )}
    {_.flatten(
      Object.keys(config).map(k => config[k].map(x => ({ ...x, entity: k })))
    ).map(
      ({
        displayName,
        entity,
        field,
        type,
        namespacedField = namespaceField({ entity, field }),
        data = parseData({
          type,
          data: aggData[namespacedField] || (search[entity] || {}).aggs || {}
        }),
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
            stats={data.stats || {}}
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

export default enhance(AggPanel);
