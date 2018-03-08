import React from "react";

import DataTable from "@capsid/components/DataTable";
import Statistics from "@capsid/components/Statistics";

const AlignmentsTab = ({
  filter,
  updateFilter,
  hasStatistics,
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
        Cell: args => CellLink({ args, to: "alignments", accessor: "id" })
      },
      {
        Header: "Project",
        accessor: "projectLabel",
        Cell: args => CellLink({ args, to: "projects", accessor: "projectId" })
      },
      {
        Header: "Sample",
        accessor: "sample",
        Cell: args => CellLink({ args, to: "samples", accessor: "sampleId" })
      },
      { Header: "Aligner", accessor: "aligner" },
      { Header: "Platform", accessor: "platform" },
      { Header: "Type", accessor: "type" },
      ...(hasStatistics
        ? [
            {
              Header: "Statistics",
              id: "statistics",
              sortable: false,
              accessor: "statistics",
              Cell: ({ value }) => <Statistics content={value} />
            }
          ]
        : [])
    ]}
    filterColumns={[
      "name",
      "projectLabel",
      "sample",
      "aligner",
      "platform",
      "type"
    ]}
    filter={filter}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default AlignmentsTab;
