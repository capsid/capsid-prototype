import React from "react";
import { compose, withPropsOnChange } from "recompose";
import { withRouter } from "react-router-dom";

import Table from "./Table";
import { ProjectContainer } from "./containers";
import { mapNodes, withQuery, withSort } from "../utils";

const query = { bool: { must: [] } };

const defaultSort = ["name__asc"];

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Description", accessor: "description", sortable: false },
  { Header: "Label", accessor: "label" },
  { Header: "Wiki", accessor: "wikiLink", sortable: false },
  { Header: "Version", accessor: "version" }
];

const enhance = compose(withRouter, withQuery, withSort(defaultSort));

const Projects = ({ sort, tableSort, history }) => (
  <div className="Projects">
    <ProjectContainer first={20} sort={sort} query={query}>
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
            <div style={{ flexGrow: 1 }}>
              <Table data={mapNodes(nodes)} columns={columns} sort={sort} />
            </div>
          </div>
          <button onClick={() => refetch()}>Back To Start!</button>
          {hasNextPage && <button onClick={loadMore}>Load More!</button>}
        </div>
      )}
    </ProjectContainer>
  </div>
);

export default enhance(Projects);
