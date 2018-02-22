import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, defaultProps } from "./AggContainer";

const Query = gql`
  query MappedReadsAggregation(
    $aggs: [MappedReadEsAggBlock!]
    $sort: [MappedReadEsSortEnum!]
  ) {
    items: mappedReadEsConnection(aggs: $aggs, sort: $sort) {
      aggregations
    }
  }
`;

export default graphql(Query, {
  options: defaultOptions,
  props: defaultProps
})(Container);
