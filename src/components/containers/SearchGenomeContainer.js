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
        aggs
      }
      samples {
        total
        aggs
      }
      alignments {
        total
        aggs
      }
      genomes {
        total
        aggs
        endCursor
        hits(size: $size, after: $after, sort: $sort) {
          id
          name
          length
          organism
          accession
          taxonomy
        }
      }
    }
  }
`;

export default graphql(Query, {
  props: loadMore(Query)
})(Container);
