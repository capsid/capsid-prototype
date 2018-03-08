import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";

export const fragments = {
  details: gql`
    fragment ProjectDetails on Project {
      description
      label
      version
      wikiLink
      name
    }
  `
};

const Query = gql`
  query Project($id: MongoID!) {
    item: projectById(_id: $id) {
      _id
      createdAt
      updatedAt
      ...ProjectDetails
    }
  }
  ${fragments.details}
`;

export default graphql(Query)(Container);
