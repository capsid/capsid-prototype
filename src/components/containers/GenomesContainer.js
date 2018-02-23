import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

const Query = gql`
  query Genomes(
    $query: GenomeEsQuery!
    $sort: [GenomeEsSortEnum]!
    $first: Int!
    $cursor: String
  ) {
    items: genomeEsConnection(
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
            name
            length
            organism
            taxonomy
            strand
            accession
            gi
            taxonId
            left
            version
            sampleCount
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
