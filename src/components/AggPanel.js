import React from "react";
import _ from "lodash";

import { TermAgg, RangeAgg } from "@arranger/components/dist/Aggs";
import {
  inCurrentSQON,
  currentFieldValue
} from "@arranger/components/dist/SQONView/utils";

const AggPanel = ({ config, search, loading, sqon, updateSQON }) => (
  <div>
    {!loading &&
      _.flatten(
        Object.keys(search)
          .map(k => ({ entity: k, aggs: search[k].aggs }))
          .filter(({ aggs }) => !!aggs)
          .map(({ entity, aggs }) =>
            config[entity].map(({ field, type, ...aggConfig }) => {
              const aggRoot = aggs[`${field}:global`]
                ? aggs[`${field}:global`][`${field}:filtered`]
                : aggs;
              return {
                ...aggConfig,
                field,
                type,
                entity,
                data: aggRoot[type === "stats" ? `${field}:stats` : field]
              };
            })
          )
      ).map(
        ({
          entity,
          field,
          data,
          type,
          displayName,
          namespacedField = `${entity}.${field}`,
          key = field + JSON.stringify(data)
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
