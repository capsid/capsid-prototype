import React from "react";
import { compose, withProps, withState } from "recompose";
import { connect } from "react-redux";
import ReactTable from "react-table";

import { CurrentSQON } from "@arranger/components/dist/Arranger";
import { TermAgg } from "@arranger/components/dist/Aggs";
import RangeAgg from "@arranger/components/dist/Aggs/RangeAgg";
import {
  inCurrentSQON,
  replaceSQON,
  toggleSQON
} from "@arranger/components/dist/SQONView/utils";

import "react-table/react-table.css";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

const enhance = compose(
  withProps(() => ({
    aggs: [
      {
        field: "color",
        displayName: "Color",
        type: "Aggregations",
        buckets: [
          {
            doc_count: 1,
            key: "green"
          },
          {
            doc_count: 5,
            key: "yellow"
          },
          {
            doc_count: 12,
            key: "blue"
          }
        ]
      },
      {
        field: "taste",
        displayName: "Taste",
        type: "Aggregations",
        buckets: [
          {
            doc_count: 1,
            key: "spicy"
          },
          {
            doc_count: 5,
            key: "sweet"
          },
          {
            doc_count: 12,
            key: "sour"
          },
          {
            doc_count: 5,
            key: "salty"
          },
          {
            doc_count: 12,
            key: "umami"
          },
          {
            doc_count: 12,
            key: "bland"
          }
        ]
      },
      {
        field: "cases.days_in_solitary",
        displayName: "Days in Solitary",
        type: "NumericAggregations",
        unit: "d",
        stats: {
          max: 1000.5,
          min: 5,
          count: 200,
          avg: 200.4,
          sum: 4000
        }
      }
    ]
  })),
  withState("sqon", "setSqon", {
    op: "and",
    content: []
  })
);

const Table = ({ aggs, profile, sqon, setSqon }) => (
  <div className="Table">
    <div style={{ marginTop: 40 }}>
      <CurrentSQON sqon={sqon} setSQON={setSqon} />
      <div style={{ display: "flex" }}>
        <div style={{ width: 300 }}>
          {aggs.map(
            agg =>
              agg.type === "NumericAggregations" ? (
                <RangeAgg
                  {...agg}
                  key={agg.field}
                  handleChange={({ max, min, field }) => {
                    setSqon(
                      replaceSQON(
                        {
                          op: "and",
                          content: [
                            { op: ">=", content: { field, value: min } },
                            { op: "<=", content: { field, value: max } }
                          ]
                        },
                        sqon
                      )
                    );
                  }}
                />
              ) : (
                <TermAgg
                  {...agg}
                  key={agg.field}
                  Content={({ content, ...props }) => (
                    <div
                      {...props}
                      onClick={() =>
                        setSqon(
                          toggleSQON(
                            {
                              op: "and",
                              content: [
                                {
                                  op: "in",
                                  content: {
                                    ...content,
                                    value: [content.value] || []
                                  }
                                }
                              ]
                            },
                            sqon
                          )
                        )
                      }
                    />
                  )}
                  isActive={d =>
                    inCurrentSQON({
                      value: d.value,
                      dotField: d.field,
                      currentSQON: sqon
                    })
                  }
                />
              )
          )}
        </div>
        <div style={{ flexGrow: 1 }}>
          <ReactTable
            data={[
              { name: "Jordan", age: "26" },
              { name: "Willie", age: 4 },
              { name: "George", age: 29 }
            ]}
            columns={[
              { Header: "Name", accessor: "name" },
              { Header: "Age", accessor: "age" }
            ]}
            defaultPageSize={20}
            className="-striped -highlight"
          />
        </div>
      </div>
    </div>
  </div>
);

export default connect(state => ({
  profile: state.user.profile
}))(enhance(Table));
