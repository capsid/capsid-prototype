import React from "react";
import { withRouter } from "react-router";

import { ProjectContainer } from "@capsid/components/containers";
import ProjectAccesses from "@capsid/components/ProjectAccesses";

const Project = ({ match: { params: { id } } }) => (
  <div>
    <ProjectContainer id={id}>
      {({ data: { item } }) => (
        <div>
          <div>
            <h4>Project:</h4>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
          <ProjectAccesses projectId={id} />
        </div>
      )}
    </ProjectContainer>
  </div>
);

export default withRouter(Project);
