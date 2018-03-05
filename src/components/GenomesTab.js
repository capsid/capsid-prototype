import React from "react";

import DataTable from "@capsid/components/DataTable";

const GenomesTab = ({
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
        Cell: args => CellLink({ args, to: "genome", accessor: "id" })
      },
      { Header: "Organism", accessor: "organism" },
      {
        Header: "Taxonomy",
        id: "taxonomy",
        accessor: x => (x.taxonomy || []).join(" / ")
      },
      { Header: "Accession", accessor: "accession" },
      { Header: "Length", accessor: "length" }
    ]}
    filter={filter}
    filterColumns={["name", "organism", "taxonomy", "accession"]}
    updateFilter={updateFilter}
    sort={sort}
    updateSort={updateSort}
  />
);

export default GenomesTab;
