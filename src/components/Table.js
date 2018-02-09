import React from "react";
import { compose, withProps, withPropsOnChange, withState } from "recompose";
import ReactTable from "react-table";
import elasticsearch from "elasticsearch";

import { nested, aggs } from "../dummyData/aggs";

import { CurrentSQON } from "@arranger/components/dist/Arranger";
import { TermAgg } from "@arranger/components/dist/Aggs";
import RangeAgg from "@arranger/components/dist/Aggs/RangeAgg";
import {
  inCurrentSQON,
  replaceSQON,
  toggleSQON
} from "@arranger/components/dist/SQONView/utils";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

// import FilterProcessor from "@arranger/middleware/dist/filters";
// import AggregationProcessor from "@arranger/middleware/dist/aggregations";

import AggregationProcessor from "../aggregations";
import FilterProcessor from "../filter";

import "react-table/react-table.css";

const fetchData = async ({ sqon, page, pageSize }) => {
  const query = new FilterProcessor().buildFilters("", nested, sqon);
  console.log("query", query);
  console.log("else", sqon, page, pageSize);
};

class Table extends React.Component {
  state = {
    page: 1,
    pageSize: 20,
    data: [],
    sqon: { op: "and", content: [] },
    aggs: [],
    es: new elasticsearch.Client({ host: "localhost:9200", log: "trace" })
  };

  componentDidMount() {
    this.getAggData();
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    let { sqon: lastSqon } = this.state;
    let { sqon } = nextProps;
    if (sqon !== lastSqon) {
      this.setState({ sqon });
      this.fetchData();
    }
  }

  getAggData = async () => {
    let { es } = this.state;
    let nested_fields = ["files"];
    let aggregationProcessor = new AggregationProcessor();
    let { query, aggs } = aggregationProcessor.buildAggregations({
      type: { name: "data" },
      fields: ["gender", "files__size"],
      graphql_fields: {
        gender: {
          buckets: {
            doc_count: {},
            key: {}
          }
        },
        files__size: {
          stats: {
            max: {},
            min: {},
            count: {},
            avg: {},
            sum: {}
          },
          histogram: {
            buckets: {
              doc_count: {},
              key: {},
              key_as_string: {}
            }
          }
        }
      },
      nested_fields,
      args: {}
    });

    let body = query && Object.keys(query).length ? { query, aggs } : { aggs };

    let { aggregations } = await es.search({
      index: "data",
      type: "data",
      size: 0,
      _source: false,
      body
    });

    console.log("aggregations", aggregations);

    let { pruned } = await aggregationProcessor.pruneAggregations({
      nested_fields,
      aggs: aggregations
    });

    console.log("pruned", pruned);
  };

  fetchData = async () => {
    let { aggs, sqon, page, pageSize } = this.state;
    const data = await fetchData({ aggs, sqon, page, pageSize });
    console.log(data);
    this.setState({ data });
  };

  setSqon = sqon => {
    this.setState({ sqon });
    this.fetchData();
  };

  render() {
    let { aggs, sqon } = this.state;
    return (
      <div className="Table">
        <div style={{ marginTop: 40 }}>
          <CurrentSQON sqon={sqon} setSQON={this.setSqon} />
          <div style={{ display: "flex" }}>
            <div style={{ width: 300 }}>
              {aggs.map(
                agg =>
                  agg.type === "NumericAggregations" ? (
                    <RangeAgg
                      {...agg}
                      key={agg.field}
                      handleChange={({ max, min, field }) => {
                        this.setSqon(
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
                            this.setSqon(
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
  }
}

export default Table;
