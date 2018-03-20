import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { loadMore } from "./Container";

const Query = gql`
  query Projects(
    $query: String!
    $aggs: String!
    $size: Int!
    $after: String
    $sort: [String!]
  ) {
    search(query: $query, aggs: $aggs) {
      projects {
        total
        endCursor
        hasStatistics
        hits(size: $size, after: $after, sort: $sort) {
          id
          cacheId
          description
          label
          version
          wikiLink
          name
          statistics
          counts
        }
      }
      samples {
        total
      }
      alignments {
        total
      }
      genomes {
        total
      }
    }
  }
`;

export default graphql(Query, {
  props: loadMore(Query)
})(Container);
