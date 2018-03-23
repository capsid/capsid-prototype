import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { AlignmentContainer } from "@capsid/components/containers";

import Page from "@capsid/components/Page";
import DetailsTable from "@capsid/components/DetailsTable";

const enhance = compose(withRouter);

const Alignment = ({ match: { params: { id } } }) => (
  <AlignmentContainer id={id}>
    {({ data: { item = {}, loading } }) => (
      <Page
        header={`Alignment: ${item.name}`}
        loading={loading}
        actions={[
          {
            location: `/sample/${item.sampleId}`,
            title: "Go To Sample",
            icon: "label"
          },
          {
            location: `/project/${item.projectId}`,
            title: "Go To Project",
            icon: "box"
          }
        ]}
      >
        <DetailsTable
          item={item}
          keyMap={{
            projectLabel: "Project",
            sample: "Sample",
            aligner: "Aligner",
            platform: "Platform",
            type: "Type",
            infile: "Input File",
            outfile: "Output File",
            createdAt: "Created At",
            updatedAt: "Updated At"
          }}
        />
      </Page>
    )}
  </AlignmentContainer>
);

export default enhance(Alignment);
