import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, defaultProps } from "./AggContainer";

const Query = gql`
  query ProjectAggregations($aggs: [ProjectsAggBlock!]) {
    items: projects(aggs: $aggs) {
      aggregations
    }
  }
`;

export default graphql(Query, {
  options: defaultOptions,
  props: defaultProps
})(Container);
