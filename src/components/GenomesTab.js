import React from "react";
import humanize from "humanize-string";

import DataTable, {
  statisticsColumns,
  selectStatistics
} from "@capsid/components/DataTable";

const GenomesTab = ({
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
        Header: "Genome",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            minWidth: 180,
            Cell: args => CellLink({ args, to: "genome", accessor: "id" })
          },
          {
            Header: "Taxonomy",
            id: "taxonomy",
            minWidth: 150,
            accessor: x => (x.taxonomy || []).join(" / ")
          },
          { Header: "Accession", accessor: "accession", maxWidth: 90 },
          { Header: "Taxon Id", accessor: "taxonId", maxWidth: 90 },
          {
            Header: "# Projects",
            id: "projectCount",
            accessor: x => x.counts["projects"],
            sortable: false,
            className: "center",
            maxWidth: 100,
            Cell: args => CountLink({ args, to: "projects" })
          },
          {
            Header: "# Samples",
            id: "sampleCount",
            accessor: x => x.counts["samples"],
            sortable: false,
            className: "center",
            maxWidth: 100,
            Cell: args => CountLink({ args, to: "samples" })
          },
          {
            Header: "# Alignments",
            id: "alignmentCount",
            accessor: x => x.counts["alignments"],
            sortable: false,
            className: "center",
            maxWidth: 100,
            Cell: args => CountLink({ args, to: "alignments" })
          }
        ]
      },
      ...(hasStatistics
        ? [
            ...statisticsColumns({
              headerPrefix: humanize(
                (selectStatistics(hits[0].statistics).name || "").slice(0, -1)
              )
            })
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
