import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

const Query = gql`
  query Alignments(
    $query: AlignmentEsQuery!
    $sort: [AlignmentEsSortEnum]!
    $first: Int!
    $cursor: String
  ) {
    items: alignmentEsConnection(
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
            aligner
            name
            platform
            type
            version
            outfile
            infile
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
