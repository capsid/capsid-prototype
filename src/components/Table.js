import React from "react";
import ReactTable from "react-table";

const toReactTableSort = sort =>
  sort.map(x => x.split("__")).map(([x, y]) => ({ id: x, [y]: true }));

const fromReactTableSort = sort =>
  sort.map(({ id, desc }) => `${id}__${desc ? "desc" : "asc"}`);

const Table = ({ data, columns, sort, updateSort }) => (
  <ReactTable
    data={data}
    columns={columns}
    sorted={toReactTableSort(sort)}
    onSortedChange={(newSorted, column, shiftKey) =>
      updateSort({ sort: fromReactTableSort(newSorted) })
    }
    showPagination={false}
  />
);

export default Table;
