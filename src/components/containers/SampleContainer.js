import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";
import { fragments as projectFragments } from "./ProjectContainer";

export const fragments = {
  details: gql`
    fragment SampleDetails on Sample {
      source
      description
      cancer
      name
      version
      projectLabel
    }
  `
};

const Query = gql`
  query Sample($id: MongoID!) {
    item: sampleById(_id: $id) {
      _id
      updatedAt
      createdAt
      projectId
      ...SampleDetails
    }
  }
  ${fragments.details}
  ${projectFragments.details}
`;

export default graphql(Query)(Container);
