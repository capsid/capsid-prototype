import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { MappedReadContainer } from "./containers";

const enhance = compose(withRouter);

const MappedRead = ({ match: { params: { id } } }) => (
  <MappedReadContainer id={id}>
    {({ data: { item } }) => (
      <div>
        <h4>Read:</h4>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    )}
  </MappedReadContainer>
);

export default enhance(MappedRead);
