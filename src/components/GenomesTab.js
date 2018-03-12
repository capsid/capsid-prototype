import React from "react";

import DataTable from "@capsid/components/DataTable";
import Statistics from "@capsid/components/Statistics";

const GenomesTab = ({
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
        Header: "Name",
        accessor: "name",
        Cell: args => CellLink({ args, to: "genome", accessor: "id" })
      },
      { Header: "Organism", accessor: "organism" },
      {
        Header: "Taxonomy",
        id: "taxonomy",
        accessor: x => (x.taxonomy || []).join(" / ")
      },
      { Header: "Accession", accessor: "accession" },
      { Header: "Taxon Id", accessor: "taxonId" },
      { Header: "Length", accessor: "length" },
      {
        Header: "# Projects",
        id: "projectCount",
        accessor: x => x.counts["projects"],
        sortable: false
      },
      {
        Header: "# Samples",
        id: "sampleCount",
        accessor: x => x.counts["samples"],
        sortable: false
      },
      {
        Header: "# Alignments",
        id: "alignmentCount",
        accessor: x => x.counts["alignments"],
        sortable: false
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
    filterColumns={["name", "organism", "taxonomy", "accession", "taxonId"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default GenomesTab;
