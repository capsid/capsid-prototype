import React from "react";

import DataTable from "@capsid/components/DataTable";
import Statistics from "@capsid/components/Statistics";

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
        Header: "Name",
        accessor: "name",
        Cell: args => CellLink({ args, to: "projects", accessor: "id" })
      },
      { Header: "Description", accessor: "description", sortable: false },
      { Header: "Label", accessor: "label" },
      { Header: "Wiki", accessor: "wikiLink", sortable: false },
      { Header: "Version", accessor: "version" },
      {
        Header: "# Samples",
        id: "sampleCount",
        accessor: x => x.counts["samples"],
        sortable: false,
        Cell: args => CountLink({ args, to: "samples" })
      },
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
    filterColumns={["name", "description", "label", "wikiLink"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default ProjectsTab;
