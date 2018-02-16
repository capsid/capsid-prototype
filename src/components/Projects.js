import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import { currentFilterValue } from "@arranger/components/dist/SQONView/utils";
import TextFilter from "@arranger/components/dist/DataTable/TableToolbar/TextFilter";
import CurrentSQON from "@arranger/components/dist/Arranger/CurrentSQON";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

import AggPanel from "./AggPanel";
import Table from "./Table";
import { ProjectContainer, ProjectAggregationContainer } from "./containers";
import {
  mapNodes,
  withParams,
  withSort,
  withUpdateSQON,
  withSQON,
  withEsQuery
} from "../utils";

const config = {
  defaultSort: ["name__asc"],
  filterColumns: ["name", "description", "label", "wikiLink"],
  columns: [
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description", sortable: false },
    { Header: "Label", accessor: "label" },
    { Header: "Wiki", accessor: "wikiLink", sortable: false },
    { Header: "Version", accessor: "version" }
  ],
  aggs: [
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
  ]
};

const ProjectsTable = compose(
  withRouter,
  withParams,
  withSort(config.defaultSort),
  withSQON,
  withUpdateSQON,
  withEsQuery
)(({ aggs, sort, sqon, updateSQON, esQuery, params, history }) => (
  <ProjectContainer first={20} sort={sort} query={esQuery}>
    {({
      data: {
        items: { nodes, count, pageInfo: { hasNextPage } },
        loading,
        refetch
      },
      loadMore
    }) => (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 300 }}>
            <AggPanel {...aggs} sqon={sqon} updateSQON={updateSQON} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <CurrentSQON sqon={sqon} setSQON={updateSQON} />
            <TextFilter
              value={currentFilterValue(sqon)}
              onChange={({ generateNextSQON }) => {
                updateSQON(
                  generateNextSQON({ sqon, fields: config.filterColumns })
                );
              }}
            />
            <Table
              data={mapNodes(nodes)}
              columns={config.columns}
              updateSort={({ sort }) =>
                history.push({
                  search: queryString.stringify({ ...params, sort })
                })
              }
              sort={sort}
            />
            <div style={{ display: "flex" }}>
              <button style={{ marginRight: "auto" }} onClick={() => refetch()}>
                First Page
              </button>
              {hasNextPage && (
                <button style={{ marginLeft: "auto" }} onClick={loadMore}>
                  Next Page
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </ProjectContainer>
));

const Projects = () => (
  <div className="Projects">
    <ProjectAggregationContainer config={config.aggs}>
      {aggs => <ProjectsTable aggs={aggs} />}
    </ProjectAggregationContainer>
  </div>
);

export default Projects;
