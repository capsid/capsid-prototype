import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withParams, withUpdateSQON } from "../utils";

import { TermAgg, RangeAgg } from "@arranger/components/dist/Aggs";
import {
  inCurrentSQON,
  currentFieldValue
} from "@arranger/components/dist/SQONView/utils";

const AggPanel = compose(withRouter, withParams, withUpdateSQON)(
  ({ config, loading, aggregations, sqon, updateSQON }) => (
    <div>
      {!loading &&
        config
          .map(x => ({ ...x, key: x.field, data: aggregations[x.field] }))
          .map(
            agg =>
              agg.type === "term" ? (
                <TermAgg
                  {...agg}
                  buckets={agg.data.buckets || []}
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
                  {...agg}
                  stats={agg.data}
                  value={{
                    min:
                      currentFieldValue({
                        sqon,
                        dotField: agg.field,
                        op: ">="
                      }) || agg.data.min,
                    max:
                      currentFieldValue({
                        sqon,
                        dotField: agg.field,
                        op: "<="
                      }) || agg.data.max
                  }}
                  handleChange={({ generateNextSQON }) =>
                    updateSQON(generateNextSQON(sqon))
                  }
                />
              )
          )}
    </div>
  )
);

export default AggPanel;
