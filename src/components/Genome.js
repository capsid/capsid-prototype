import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { GenomeContainer } from "./containers";

const enhance = compose(withRouter);

const Genome = ({ match: { params: { id } } }) => (
  <GenomeContainer id={id}>
    {({ data: { item } }) => (
      <div>
        <h4>Genome:</h4>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    )}
  </GenomeContainer>
);

export default enhance(Genome);
