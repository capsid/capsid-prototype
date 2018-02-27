import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";

import { fragments } from "./AccessesContainer";

const Mutation = gql`
  mutation accessAdd(
    $projectId: String!
    $userEmail: String!
    $access: String!
  ) {
    item: accessAdd(
      projectId: $projectId
      userEmail: $userEmail
      access: $access
    ) {
      ...AccessDetails
    }
  }
  ${fragments.details}
`;

export default graphql(Mutation)(Container);
