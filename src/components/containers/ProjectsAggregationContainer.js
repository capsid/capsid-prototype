import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, defaultProps } from "./AggContainer";

const Query = gql`
  query ProjectsAggregation(
    $aggs: [ProjectEsAggBlock!]
    $sort: [ProjectEsSortEnum!]
  ) {
    items: projectEsConnection(aggs: $aggs, sort: $sort) {
      aggregations
    }
  }
`;

export default graphql(Query, {
  options: defaultOptions,
  props: defaultProps
})(Container);
