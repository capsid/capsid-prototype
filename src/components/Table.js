import React from "react";
import ReactTable from "react-table";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

import { withQuery } from "../utils";

const toReactTableSort = sort =>
  sort.map(x => x.split("__")).map(([x, y]) => ({ id: x, [y]: true }));

const fromReactTableSort = sort =>
  sort.map(({ id, desc }) => `${id}__${desc ? "desc" : "asc"}`);

const enhance = compose(withRouter, withQuery);

const Table = ({ data, columns, query, sort, history }) => (
  <ReactTable
    data={data}
    columns={columns}
    sorted={toReactTableSort(sort)}
    onSortedChange={(newSorted, column, shiftKey) => {
      history.push({
        search: queryString.stringify({
          ...query,
          sort: fromReactTableSort(newSorted)
        })
      });
    }}
    showPagination={false}
  />
);

export default enhance(Table);
