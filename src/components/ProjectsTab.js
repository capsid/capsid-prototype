import React from "react";

import DataTable from "@capsid/components/DataTable";

const ProjectsTab = ({
  filter,
  updateFilter,
  hits,
  sort,
  updateSort,
  CellLink
}) => (
  <DataTable
    data={hits}
    columns={[
      {
        Header: "Name",
        accessor: "name",
        Cell: args => CellLink({ args, to: "projects", accessor: "id" })
      },
      { Header: "Description", accessor: "description", sortable: false },
      { Header: "Label", accessor: "label" },
      { Header: "Wiki", accessor: "wikiLink", sortable: false },
      { Header: "Version", accessor: "version" }
    ]}
    filter={filter}
    filterColumns={["name", "description", "label", "wikiLink"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default ProjectsTab;
