import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

const Query = gql`
  query Projects(
    $query: ProjectEsQuery!
    $sort: [ProjectEsSortEnum]!
    $first: Int!
    $cursor: String
  ) {
    items: projectEsConnection(
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
            description
            roles
            label
            version
            wikiLink
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
