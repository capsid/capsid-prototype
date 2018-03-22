import React from "react";
import { withRouter } from "react-router";
import { Tabs2, Tab2 } from "@blueprintjs/core";

import Page from "@capsid/components/Page";
import DetailsTable from "@capsid/components/DetailsTable";
import { ProjectContainer } from "@capsid/components/containers";
import ProjectAccesses from "@capsid/components/ProjectAccesses";

const ProjectDetails = ({ item }) => (
  <DetailsTable
    item={item}
    keyMap={{
      name: "Name",
      label: "Label",
      description: "Description",
      createdAt: "Created At",
      updatedAt: "Updated At",
      wikiLink: "Wiki Link"
    }}
  />
);

const Project = ({ match: { params: { id } } }) => (
  <ProjectContainer id={id}>
    {({ data: { item = {}, loading } }) => (
      <Page header={`Project: ${item.label}`} loading={loading}>
        <Tabs2 id="projectTabs">
          <Tab2
            id="details"
            title="Details"
            panel={<ProjectDetails item={item} />}
          />
          <Tab2
            id="users"
            title="Users"
            panel={<ProjectAccesses projectId={id} />}
          />
        </Tabs2>
      </Page>
    )}
  </ProjectContainer>
);

export default withRouter(Project);
