import React from "react";

import DataTable from "@capsid/components/DataTable";
import Statistics from "@capsid/components/Statistics";

const SamplesTab = ({
  filter,
  updateFilter,
  hasStatistics,
  hits,
  sort,
  updateSort,
  CellLink,
  CountLink
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
      { Header: "Version", accessor: "version" },
      {
        Header: "# Alignments",
        id: "alignmentCount",
        accessor: x => x.counts["alignments"],
        sortable: false,
        Cell: args => CountLink({ args, to: "alignments" })
      },
      {
        Header: "# Genomes",
        id: "genomeCount",
        accessor: x => x.counts["genomes"],
        sortable: false,
        Cell: args => CountLink({ args, to: "genomes" })
      },
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
    filter={filter}
    filterColumns={["name", "projectLabel", "cancer", "source"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default SamplesTab;
