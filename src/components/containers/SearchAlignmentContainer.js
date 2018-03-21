import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { loadMore } from "./Container";

const Query = gql`
  query Alignments(
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
        endCursor
        hasStatistics
        hits(size: $size, after: $after, sort: $sort) {
          id
          cacheId
          projectId
          projectLabel
          sampleId
          sample
          aligner
          name
          platform
          type
          version
          infile
          outfile
          statistics
          counts
        }
      }
      genomes {
        total
        aggs
      }
      statistics {
        aggs
      }
    }
  }
`;

export default graphql(Query, {
  props: loadMore(Query)
})(Container);
