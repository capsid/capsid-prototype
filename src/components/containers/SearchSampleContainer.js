import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { loadMore } from "./Container";

const Query = gql`
  query Samples(
    $query: String!
    $aggs: String!
    $size: Int!
    $after: String
    $sort: [String!]
  ) {
    search(query: $query, aggs: $aggs) {
      projects {
        total
        aggs
      }
      samples {
        total
        aggs
        endCursor
        hasStatistics
        hits(size: $size, after: $after, sort: $sort) {
          id
          projectId
          projectLabel
          name
          source
          description
          cancer
          version
          statistics
        }
      }
      alignments {
        total
        aggs
      }
      genomes {
        total
        aggs
      }
    }
  }
`;

export default graphql(Query, {
  props: loadMore(Query)
})(Container);
