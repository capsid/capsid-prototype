import React from "react";

import DataTable, { statisticsColumns } from "@capsid/components/DataTable";

const AlignmentsTab = ({
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
        Header: "Alignment",
        columns: [
          {
            Header: "ID / Name",
            id: "name",
            accessor: x => x.name || x.id,
            Cell: args => CellLink({ args, to: "alignment", accessor: "id" })
          },
          {
            Header: "Project",
            accessor: "projectLabel",
            Cell: args =>
              CellLink({ args, to: "project", accessor: "projectId" })
          },
          {
            Header: "Sample",
            accessor: "sample",
            Cell: args => CellLink({ args, to: "sample", accessor: "sampleId" })
          },
          { Header: "Aligner", accessor: "aligner" },
          { Header: "Platform", accessor: "platform" },
          { Header: "Type", accessor: "type" },
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
