import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { AlignmentContainer } from "@capsid/components/containers";

const enhance = compose(withRouter);

const Alignment = ({ match: { params: { id } } }) => (
  <AlignmentContainer id={id}>
    {({ data: { item } }) => (
      <div>
        <h4>Alignment:</h4>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    )}
  </AlignmentContainer>
);

export default enhance(Alignment);
