import React from "react";
import stringifyObject from "stringify-object";
import urlJoin from "url-join";

import CurrentSQON from "@arranger/components/dist/Arranger/CurrentSQON";
import DataTable from "@arranger/components/dist/DataTable";
import { TermAgg, RangeAgg } from "@arranger/components/dist/Aggs";
import {
  inCurrentSQON,
  currentFieldValue
} from "@arranger/components/dist/SQONView/utils";
import "@arranger/components/public/themeStyles/beagle/beagle.css";
import FilterProcessor from "@arranger/middleware/dist/filters";

import { apiRoot } from "../common/injectGlobals";
import { removeProp } from "../utils";
import withAggs from "./withAggs";

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

class OldTable extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSqon = { op: "and", content: [] };
    this.state = { sqon: this.defaultSqon };
  }

  setSqon = sqon => {
    this.setState({ sqon: sqon || this.defaultSqon });
  };

  fetchData = ({ sort, offset, first }) => {
    let { sqon } = this.state;

    const esQuery = removeProp(
      new FilterProcessor().buildFilters("", [], sqon),
      "boost"
    );

    // TODO: feels hacky, is here to transform JSON into graphQL accepted syntax
    const esQueryString = stringifyObject(esQuery, {
      singleQuotes: false
    })
      .split("\t")
      .join("")
      .split("\n")
      .join("")
      .replace('"phrase_prefix"', "phrase_prefix"); // search type is enum not string :/

    const graphqlSort = JSON.stringify(
      sort ? sort.map(({ field, order }) => `${field}__${order}`) : []
    )
      .split('"')
      .join("");

    const graphql = `
      query {
        projects(
          query: ${esQueryString},
          sort: ${graphqlSort},
          skip: ${offset},
          limit: ${first}
        ) {
          count
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

    return fetch(urlJoin(apiRoot, "graphql"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: graphql })
    })
      .then(response => response.json())
      .then(({ data }) => ({
        total: data.projects.count,
        data: data.projects.hits.map(x => x._source)
      }));
  };

  render() {
    let { sqon } = this.state;
    let { aggs } = this.props;
    return (
      <div className="Table">
        <div style={{ marginTop: 40 }}>
          <CurrentSQON sqon={sqon} setSQON={this.setSqon} />
          <div style={{ display: "flex" }}>
            <div style={{ width: 300 }}>
              {aggregations
                .map(x => ({
                  ...x,
                  data: aggs.loaded && aggs.data.projects.aggregations[x.field]
                }))
                .map(x => ({ ...x, stats: x.data || { min: 0, max: 1 } }))
                .map(
                  agg =>
                    agg.type === "numeric" ? (
                      <RangeAgg
                        {...agg}
                        stats={agg.stats}
                        key={agg.field + JSON.stringify(agg.data)}
                        value={{
                          min:
                            currentFieldValue({
                              sqon,
                              dotField: agg.field,
                              op: ">="
                            }) || agg.stats.min,
                          max:
                            currentFieldValue({
                              sqon,
                              dotField: agg.field,
                              op: "<="
                            }) || agg.stats.max
                        }}
                        handleChange={({ generateNextSQON }) =>
                          this.setSqon(generateNextSQON(sqon))
                        }
                      />
                    ) : (
                      <TermAgg
                        {...agg}
                        buckets={agg.data ? agg.data.buckets : []}
                        key={agg.field}
                        handleValueClick={({ generateNextSQON }) =>
                          this.setSqon(generateNextSQON(sqon))
                        }
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
              <DataTable
                sqon={sqon}
                allowTogglingColumns={false}
                allowTSVExport={false}
                config={{
                  columns: [
                    { Header: "Name", accessor: "name" },
                    { Header: "Description", accessor: "description" },
                    { Header: "Label", accessor: "label" },
                    { Header: "Wiki", accessor: "wikiLink" },
                    { Header: "Version", accessor: "version" }
                  ]
                }}
                onFilterChange={({ generateNextSQON }) =>
                  this.setSqon(
                    generateNextSQON({
                      sqon,
                      fields: ["name", "description", "label", "wikiLink"]
                    })
                  )
                }
                fetchData={this.fetchData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAggs(aggregations)(OldTable);
