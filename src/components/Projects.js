import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import CurrentSQON from "@arranger/components/dist/Arranger/CurrentSQON";

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

const defaultSort = ["name__asc"];

const columnConfig = [
  { Header: "Name", accessor: "name" },
  { Header: "Description", accessor: "description", sortable: false },
  { Header: "Label", accessor: "label" },
  { Header: "Wiki", accessor: "wikiLink", sortable: false },
  { Header: "Version", accessor: "version" }
];

const aggConfig = [
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

const ProjectsTable = compose(
  withRouter,
  withParams,
  withSort(defaultSort),
  withSQON,
  withUpdateSQON,
  withEsQuery
)(({ aggs, sort, sqon, updateSQON, esQuery }) => (
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
        <CurrentSQON sqon={sqon} setSQON={updateSQON} />
        <div style={{ display: "flex" }}>
          <div style={{ width: 300 }}>
            <AggPanel {...aggs} sqon={sqon} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Table data={mapNodes(nodes)} columns={columnConfig} sort={sort} />
          </div>
        </div>
        <button onClick={() => refetch()}>Back To Start!</button>
        {hasNextPage && <button onClick={loadMore}>Load More!</button>}
      </div>
    )}
  </ProjectContainer>
));

const Projects = () => (
  <div className="Projects">
    <ProjectAggregationContainer config={aggConfig}>
      {aggs => <ProjectsTable aggs={aggs} />}
    </ProjectAggregationContainer>
  </div>
);

export default Projects;
