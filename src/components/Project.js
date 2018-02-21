import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { ProjectContainer } from "./containers";

const enhance = compose(withRouter);

const Project = ({ match: { params: { id } } }) => (
  <ProjectContainer id={id}>
    {({ data: { item } }) => (
      <div>
        <h4>Project:</h4>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    )}
  </ProjectContainer>
);

export default enhance(Project);
