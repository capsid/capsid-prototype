import React from "react";
import ReactTable from "react-table";
import { Connect, query } from "urql";
import stringifyObject from "stringify-object";

import { CurrentSQON } from "@arranger/components/dist/Arranger";
import { TermAgg } from "@arranger/components/dist/Aggs";
import RangeAgg from "@arranger/components/dist/Aggs/RangeAgg";
import {
  inCurrentSQON,
  replaceSQON,
  toggleSQON
} from "@arranger/components/dist/SQONView/utils";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

import FilterProcessor from "@arranger/middleware/dist/filters";

import { removeProp } from "../utils";
import withAggs from "./withAggs";
import "react-table/react-table.css";

const aggregations = [
  {
    field: "label",
    displayName: "Label",
    type: "term"
  },
  {
    field: "version",
    displayName: "Version",
    type: "numeric"
  }
];

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSqon = { op: "and", content: [] };
    this.state = {
      page: 1,
      pageSize: 20,
      sqon: this.defaultSqon
    };
  }

  setSqon = sqon => {
    this.setState({ sqon: sqon || this.defaultSqon });
  };

  query = () => {
    let { sqon, page, pageSize } = this.state;

    const esQuery = removeProp(
      new FilterProcessor().buildFilters("", [], sqon),
      "boost"
    );
    const esQueryString = stringifyObject(esQuery, {
      singleQuotes: false
    })
      .split("\t")
      .join("")
      .split("\n")
      .join("");
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const graphql = `
      {
        projects(
          query: ${esQueryString},
          sort: [version__asc],
          skip: ${skip},
          limit: ${limit}
        ) {
          hits {
            _id
            _source {
              description
              roles
              name
              label
              version
              wikiLink
            }
          }
        }
      }
    `;
    return query(graphql);
  };

  render() {
    let { sqon } = this.state;
    let { aggs } = this.props;
    return (
      <Connect
        query={this.query()}
        children={({ loaded, data, error }) => (
          <div className="Table">
            <div style={{ marginTop: 40 }}>
              <CurrentSQON sqon={sqon} setSQON={this.setSqon} />
              <div style={{ display: "flex" }}>
                <div style={{ width: 300 }}>
                  {aggregations
                    .map(x => ({
                      ...x,
                      data:
                        aggs.loaded && aggs.data.projects.aggregations[x.field]
                    }))
                    .map(
                      agg =>
                        agg.type === "numeric" ? (
                          <RangeAgg
                            {...agg}
                            stats={agg.data || { min: 0, max: 1 }}
                            key={agg.field + JSON.stringify(agg.data)}
                            handleChange={({ max, min, field }) => {
                              this.setSqon(
                                replaceSQON(
                                  {
                                    op: "and",
                                    content: [
                                      {
                                        op: ">=",
                                        content: { field, value: min }
                                      },
                                      {
                                        op: "<=",
                                        content: { field, value: max }
                                      }
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
                            buckets={agg.data ? agg.data.buckets : []}
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
                    loading={!loaded}
                    data={loaded ? data.projects.hits.map(x => x._source) : []}
                    columns={[
                      { Header: "Name", accessor: "name" },
                      { Header: "Description", accessor: "description" },
                      { Header: "Label", accessor: "label" },
                      { Header: "Wiki", accessor: "wikiLink" },
                      { Header: "Version", accessor: "version" }
                    ]}
                    defaultPageSize={20}
                    className="-striped -highlight"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export default withAggs(aggregations)(Table);
