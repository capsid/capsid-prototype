import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";

import { GenomeContainer } from "@capsid/components/containers";
import Page from "@capsid/components/Page";
import DetailsTable from "@capsid/components/DetailsTable";

const enhance = compose(withRouter);

const Genome = ({ match: { params: { id } } }) => (
  <GenomeContainer id={id}>
    {({ data: { item = {}, loading } }) => (
      <Page header={`Genome: ${item.accession}`} loading={loading}>
        <DetailsTable
          item={item}
          keyMap={{
            accession: "Accession",
            gi: "GI",
            name: "Name",
            organism: "Organism",
            taxonomy: "Taxonomy",
            strand: "Strand",
            taxonId: "Taxon ID",
            sampleCount: "# Samples",
            createdAt: "Created At",
            updatedAt: "Updated At"
          }}
        />
      </Page>
    )}
  </GenomeContainer>
);

export default enhance(Genome);
