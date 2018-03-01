import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { SampleContainer } from "@capsid/components/containers";

const enhance = compose(withRouter);

const Sample = ({ match: { params: { id } } }) => (
  <SampleContainer id={id}>
    {({ data: { item } }) => (
      <div>
        <h4>Sample:</h4>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    )}
  </SampleContainer>
);

export default enhance(Sample);
