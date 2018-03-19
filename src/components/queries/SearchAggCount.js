import gql from "graphql-tag";

const Query = gql`
  query SearchAggCount($query: String!, $aggs: String!, $agg: String!) {
    items: searchAggCount(query: $query, aggs: $aggs, agg: $agg) {
      buckets
    }
  }
`;

export default Query;
