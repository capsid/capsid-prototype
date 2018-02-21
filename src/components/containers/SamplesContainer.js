import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

const Query = gql`
  query Samples(
    $query: SampleEsQuery!
    $sort: [SampleEsSortEnum]!
    $first: Int!
    $cursor: String
  ) {
    items: sampleEsConnection(
      query: $query
      sort: $sort
      first: $first
      after: $cursor
    ) {
      count
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes: edges {
        node {
          _id
          _source {
            id
            projectId
            source
            projectLabel
            role
            description
            cancer
            version
            name
          }
        }
      }
    }
  }
`;

export default graphql(Query, {
  options: defaultOptions,
  props: loadMore(Query)
})(Container);
