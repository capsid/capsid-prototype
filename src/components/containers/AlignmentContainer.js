import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";
import { fragments as sampleFragments } from "./SampleContainer";
import { fragments as projectFragments } from "./ProjectContainer";

export const fragments = {
  details: gql`
    fragment AlignmentDetails on Alignment {
      aligner
      name
      platform
      type
      version
      outfile
      infile
    }
  `
};

const Query = gql`
  query Alignment($id: MongoID!) {
    item: alignmentById(_id: $id) {
      _id
      updatedAt
      createdAt
      ...AlignmentDetails
      sample_ {
        ...SampleDetails
      }
      project_ {
        ...ProjectDetails
      }
    }
  }
  ${fragments.details}
  ${sampleFragments.details}
  ${projectFragments.details}
`;

export default graphql(Query)(Container);
