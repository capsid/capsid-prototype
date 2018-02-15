import React from "react";
import { Connect, query } from "urql";

const aggsQuery = aggs => {
  const graphqlAggs = aggs
    .map(x => ({ ...x, type: x.type === "numeric" ? "stats" : "terms" }))
    .map(
      ({ field, type }) =>
        `{ key: "${field}", value: { ${type}: { field: ${field} } } }`
    );
  return query(`
    {
      projects(
        aggs: [${graphqlAggs.join(",")}]
      ) {
        aggregations
      }
    }
  `);
};

export default aggs => Component => props => (
  <Connect
    query={aggsQuery(aggs)}
    children={result => <Component {...props} aggs={result} />}
  />
);
