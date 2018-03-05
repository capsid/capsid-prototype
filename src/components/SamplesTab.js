import React from "react";

import DataTable from "@capsid/components/DataTable";

const SamplesTab = ({
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
        Header: "ID / Name",
        id: "name",
        accessor: x => x.name || x.id,
        Cell: args => CellLink({ args, to: "samples", accessor: "id" })
      },
      {
        Header: "Project",
        accessor: "projectLabel",
        Cell: args => CellLink({ args, to: "projects", accessor: "projectId" })
      },
      { Header: "Cancer", accessor: "cancer" },
      { Header: "Source", accessor: "source" },
      { Header: "Version", accessor: "version" }
    ]}
    filter={filter}
    filterColumns={["name", "projectLabel", "cancer", "source"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default SamplesTab;
