import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";

import { fragments } from "./AccessesContainer";

const Mutation = gql`
  mutation accessRemove($projectId: MongoID!, $userEmail: String!) {
    item: accessRemoveOne(
      filter: { projectId: $projectId, userEmail: $userEmail }
    ) {
      record {
        ...AccessDetails
      }
    }
  }
  ${fragments.details}
`;

export default graphql(Mutation)(Container);
