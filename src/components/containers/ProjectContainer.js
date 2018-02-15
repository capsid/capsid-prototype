import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

const Query = gql`
  query Projects(
    $query: ProjectsQuery!
    $sort: [ProjectsSortEnum]!
    $first: Int!
    $cursor: String
  ) {
    items: projectsConnection(
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
            name
            label
            version
            wikiLink
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