import React from "react";
import ReactTable from "react-table";

import TextFilter from "@arranger/components/dist/TextFilter";

const toReactTableSort = sort =>
  sort.map(x => x.split("__")).map(([x, y]) => ({ id: x, [y]: true }));

const fromReactTableSort = sort =>
  sort.map(({ id, desc }) => `${id}__${desc ? "desc" : "asc"}`);

const DataTable = ({
  data,
  columns,
  filterColumns,
  filter,
  updateFilter,
  sort,
  updateSort
}) => (
  <div>
    <TextFilter
      value={filter}
      onChange={({ value, generateNextSQON }) =>
        updateFilter({ value, generateNextSQON, filterColumns })
      }
    />
    <ReactTable
      data={data}
      columns={columns}
      sorted={toReactTableSort(sort)}
      onSortedChange={(newSorted, column, shiftKey) =>
        updateSort({ sort: fromReactTableSort(newSorted) })
      }
      showPagination={false}
    />
  </div>
);

export default DataTable;
