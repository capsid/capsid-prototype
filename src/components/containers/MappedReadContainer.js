import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Container from "./Container";
import { fragments as sampleFragments } from "./SampleContainer";
import { fragments as projectFragments } from "./ProjectContainer";
import { fragments as alignmentFragments } from "./AlignmentContainer";

export const fragments = {
  details: gql`
    fragment MappedReadDetails on MappedRead {
      sequence
      refStart
      refEnd
      pg
      readId
      platform
      mapq
      pairEnd
      minQual
      avgQual
      genome
      md
      cigar
      mismatch
      miscalls
      readLength
      alignLength
      alignScore
      mapsGene
      qqual
      sequencingType
      refStrand
      isRef
    }
  `
};

const Query = gql`
  query MappedRead($id: MongoID!) {
    item: mappedReadById(_id: $id) {
      _id
      updatedAt
      createdAt
      ...MappedReadDetails
      alignment {
        ...AlignmentDetails
      }
      sample {
        ...SampleDetails
      }
      project {
        ...ProjectDetails
      }
    }
  }
  ${fragments.details}
  ${sampleFragments.details}
  ${projectFragments.details}
  ${alignmentFragments.details}
`;

export default graphql(Query)(Container);
