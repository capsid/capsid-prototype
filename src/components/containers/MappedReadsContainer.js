import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

const Query = gql`
  query MappedReads(
    $query: MappedReadEsQuery!
    $sort: [MappedReadEsSortEnum]!
    $first: Int!
    $cursor: String
  ) {
    items: mappedReadEsConnection(
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
            createdAt
            updatedAt
            projectId
            projectLabel
            sampleId
            sampleName
            alignmentId
            alignmentName
            sequence
            refStart
            refEnd
            pg
            readId
            platform
            mapq
            pairEnd
            minQual
            avgQual
            genome
            md
            cigar
            mismatch
            miscalls
            readLength
            alignLength
            alignScore
            mapsGene
            qqual
            sequencingType
            refStrand
            isRef
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
