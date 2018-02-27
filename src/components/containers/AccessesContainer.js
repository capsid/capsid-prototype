import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container, { defaultOptions, loadMore } from "./Container";

export const fragments = {
  details: gql`
    fragment AccessDetails on Access {
      projectId
      projectLabel
      userId
      userEmail
      access
    }
  `
};

export const AccessesQuery = gql`
  query accessMany($filter: FilterFindManyAccessInput!) {
    items: accessMany(filter: $filter) {
      ...AccessDetails
    }
  }
  ${fragments.details}
`;

export default graphql(AccessesQuery, {
  options: defaultOptions,
  props: loadMore(AccessesQuery)
})(Container);
