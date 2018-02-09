import React from "react";
import { compose, withProps, withPropsOnChange, withState } from "recompose";
import ReactTable from "react-table";
import elasticsearch from "elasticsearch";

import { nested, agggs } from "../dummyData/aggs";

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
import AggregationProcessor from "@arranger/middleware/dist/aggregations";

import "react-table/react-table.css";

const replaceAll = (x, from, to) => x.split(from).join(to);

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSqon = { op: "and", content: [] };
    this.state = {
      page: 1,
      pageSize: 20,
      data: [],
      sqon: this.defaultSqon,
      aggs: [],
      es: new elasticsearch.Client({ host: "localhost:9200", log: "error" })
    };
  }

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

    const type = { name: "data" };
    const aggsUnderscore = agggs.map(x => ({
      ...x,
      field: replaceAll(x.field, ".", "__")
    }));
    const fields = aggsUnderscore.map(x => x.field);
    const graphql_fields = aggsUnderscore.reduce((obj, x) => {
      let content =
        x.type === "Aggregations"
          ? {
              buckets: { doc_count: {}, key: {} }
            }
          : {
              stats: { max: {}, min: {}, count: {}, avg: {}, sum: {} },
              histogram: {
                buckets: { doc_count: {}, key: {}, key_as_string: {} }
              }
            };
      return {
        ...obj,
        [x.field]: content
      };
    }, {});
    const nested_fields = nested;

    const aggregationProcessor = new AggregationProcessor();
    const { query, aggs } = aggregationProcessor.buildAggregations({
      type,
      fields,
      graphql_fields,
      nested_fields,
      args: {}
    });

    const body =
      query && Object.keys(query).length ? { query, aggs } : { aggs };

    let { aggregations } = await es.search({
      index: "data",
      type: "data",
      size: 0,
      _source: false,
      body
    });

    let { pruned } = await aggregationProcessor.pruneAggregations({
      nested_fields,
      aggs: aggregations
    });

    this.setState({
      aggs: agggs.map(x => ({ ...x, ...pruned[x.field] }))
    });
  };

  fetchData = async () => {
    let { es, sqon, page, pageSize } = this.state;
    const query = new FilterProcessor().buildFilters("", nested, sqon);
    const response = await es.search({
      index: "data",
      type: "data",
      from: (page - 1) * pageSize,
      size: pageSize,
      body: { query }
    });
    const data = response.hits.hits.map(x => x._source);
    this.setState({ data });
  };

  setSqon = sqon => {
    this.setState({ sqon: sqon || this.defaultSqon }, () => this.fetchData());
  };

  render() {
    let { aggs, sqon, data } = this.state;
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
                loading={!data.length}
                data={data}
                columns={[
                  { Header: "First", accessor: "first" },
                  { Header: "Last", accessor: "last" },
                  { Header: "Gender", accessor: "gender" },
                  {
                    Header: "File Count",
                    id: "file_count",
                    accessor: x => x.files.length
                  }
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
