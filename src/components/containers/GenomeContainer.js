import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";
import { fragments as sampleFragments } from "./SampleContainer";

export const fragments = {
  details: gql`
    fragment GenomeDetails on Genome {
      name
      length
      organism
      taxonomy
      strand
      accession
      gi
      taxonId
      left
      version
    }
  `
};

const Query = gql`
  query Genome($id: MongoID!) {
    item: genomeById(_id: $id) {
      _id
      updatedAt
      createdAt
      ...GenomeDetails
      sampleCount
      samples_ {
        ...SampleDetails
      }
    }
  }
  ${fragments.details}
  ${sampleFragments.details}
`;

export default graphql(Query)(Container);
