import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { SampleContainer } from "@capsid/components/containers";

import Page from "@capsid/components/Page";
import DetailsTable from "@capsid/components/DetailsTable";

const enhance = compose(withRouter);

const Sample = ({ history, match: { params: { id } } }) => (
  <SampleContainer id={id}>
    {({ data: { item = {}, loading } }) => (
      <Page
        header={`Sample: ${item.name}`}
        loading={loading}
        actions={[
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
            source: "Source",
            cancer: "Disease",
            description: "Description",
            createdAt: "Created At",
            updatedAt: "Updated At"
          }}
        />
      </Page>
    )}
  </SampleContainer>
);

export default enhance(Sample);
