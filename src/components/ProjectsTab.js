import React from "react";

import DataTable, { statisticsColumns } from "@capsid/components/DataTable";

const ProjectsTab = ({
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
        Header: "Project",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            Cell: args => CellLink({ args, to: "project", accessor: "id" })
          },
          { Header: "Label", accessor: "label" },
          {
            Header: "# Samples",
            id: "sampleCount",
            accessor: x => x.counts["samples"],
            sortable: false,
            className: "center",
            Cell: args => CountLink({ args, to: "samples" })
          },
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
    filterColumns={["name", "description", "label", "wikiLink"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default ProjectsTab;
