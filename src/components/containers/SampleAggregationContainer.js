import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, defaultProps } from "./AggContainer";

const Query = gql`
  query SampleAggregations($aggs: [SamplesAggBlock!]) {
    items: samples(aggs: $aggs) {
      aggregations
    }
  }
`;

export default graphql(Query, {
  options: defaultOptions,
  props: defaultProps
})(Container);
