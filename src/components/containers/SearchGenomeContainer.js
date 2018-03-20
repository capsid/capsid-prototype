import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { loadMore } from "./Container";

const Query = gql`
  query Genomes(
    $query: String!
    $aggs: String!
    $size: Int!
    $after: String
    $sort: [String!]
  ) {
    search(query: $query, aggs: $aggs) {
      projects {
        total
      }
      samples {
        total
      }
      alignments {
        total
      }
      genomes {
        total
        endCursor
        hasStatistics
        hits(size: $size, after: $after, sort: $sort) {
          id
          cacheId
          name
          length
          organism
          accession
          taxonomy
          taxonId
          statistics
          counts
        }
      }
    }
  }
`;

export default graphql(Query, {
  props: loadMore(Query)
})(Container);
