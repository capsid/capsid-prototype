import React from "react";

import DataTable, { statisticsColumns } from "@capsid/components/DataTable";

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
        Header: "Sample",
        columns: [
          {
            Header: "ID / Name",
            id: "name",
            accessor: x => x.name || x.id,
            Cell: args => CellLink({ args, to: "sample", accessor: "id" })
          },
          {
            Header: "Project",
            accessor: "projectLabel",
            Cell: args =>
              CellLink({ args, to: "project", accessor: "projectId" })
          },
          { Header: "Disease", accessor: "cancer" },
          {
            Header: "# Alignments",
            id: "alignmentCount",
            accessor: x => x.counts["alignments"],
            sortable: false,
            className: "center",
            Cell: args => CountLink({ args, to: "alignments" })
          },
          {
            Header: "# Genomes",
            id: "genomeCount",
            accessor: x => x.counts["genomes"],
            sortable: false,
            className: "center",
            Cell: args => CountLink({ args, to: "genomes" })
          }
        ]
      },
      ...(hasStatistics ? [...statisticsColumns({})] : [])
    ]}
    filter={filter}
    filterColumns={["name", "projectLabel", "cancer", "source"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default SamplesTab;
