import {
  ProjectsContainer,
  ProjectsAggregationContainer,
  SamplesContainer,
  SamplesAggregationContainer,
  AlignmentsContainer,
  AlignmentsAggregationContainer,
  GenomesContainer,
  GenomesAggregationContainer
} from "@capsid/components/containers";

const linkArgs = ({ to, row: { _original }, value, accessor = "id" }) => ({
  to: `/${to}/${_original[accessor]}`,
  value
});

const searchConfig = ({ CellLink }) => ({
  projects: {
    defaultSort: ["name__asc"],
    filterColumns: ["name", "description", "label", "wikiLink"],
    columns: [
      {
        Header: "Name",
        accessor: "name",
        Cell: args => CellLink(linkArgs({ ...args, to: "projects" }))
      },
      { Header: "Description", accessor: "description", sortable: false },
      { Header: "Label", accessor: "label" },
      { Header: "Wiki", accessor: "wikiLink", sortable: false },
      { Header: "Version", accessor: "version" }
    ],
    aggs: [
      {
        field: "label",
        displayName: "Label",
        type: "term"
      },
      {
        field: "version",
        displayName: "Version",
        type: "numeric"
      }
    ],
    Container: ProjectsContainer,
    AggContainer: ProjectsAggregationContainer
  },
  samples: {
    defaultSort: ["name__asc"],
    filterColumns: [
      "name",
      "description",
      "cancer",
      "role",
      "projectLabel",
      "source"
    ],
    columns: [
      {
        Header: "ID / Name",
        id: "name",
        accessor: ({ name, id }) => name || id,
        Cell: args => CellLink(linkArgs({ ...args, to: "samples" }))
      },
      {
        Header: "Project",
        accessor: "projectLabel",
        Cell: args =>
          CellLink(linkArgs({ ...args, to: "projects", accessor: "projectId" }))
      },
      { Header: "Description", accessor: "description", sortable: false },
      { Header: "Cancer", accessor: "cancer" },
      { Header: "Source", accessor: "source" },
      { Header: "Role", accessor: "role" },
      { Header: "Version", accessor: "version" }
    ],
    aggs: [
      {
        field: "cancer",
        displayName: "Cancer",
        type: "term"
      },
      {
        field: "version",
        displayName: "Version",
        type: "numeric"
      }
    ],
    Container: SamplesContainer,
    AggContainer: SamplesAggregationContainer
  },
  alignments: {
    defaultSort: ["name__asc"],
    filterColumns: [
      "name",
      "projectLabel",
      "sample",
      "aligner",
      "platform",
      "type"
    ],
    columns: [
      {
        Header: "ID / Name",
        id: "name",
        accessor: ({ name, id }) => name || id,
        Cell: args => CellLink(linkArgs({ ...args, to: "alignments" }))
      },
      {
        Header: "Project",
        accessor: "projectLabel",
        Cell: args =>
          CellLink(linkArgs({ ...args, to: "projects", accessor: "projectId" }))
      },
      {
        Header: "Sample",
        accessor: "sample",
        Cell: args =>
          CellLink(linkArgs({ ...args, to: "samples", accessor: "sampleId" }))
      },
      { Header: "Aligner", accessor: "aligner" },
      { Header: "Platform", accessor: "platform" },
      { Header: "Type", accessor: "type" }
    ],
    aggs: [
      {
        field: "aligner",
        displayName: "Aligner",
        type: "term"
      },
      {
        field: "platform",
        displayName: "Platform",
        type: "term"
      }
    ],
    Container: AlignmentsContainer,
    AggContainer: AlignmentsAggregationContainer
  },
  genome: {
    defaultSort: ["name__asc"],
    filterColumns: ["name", "organism"],
    columns: [
      {
        Header: "Id",
        accessor: "gi",
        Cell: args => CellLink(linkArgs({ ...args, to: "genome" }))
      },
      { Header: "Name", accessor: "name" },
      { Header: "Organism", accessor: "organism" },
      {
        Header: "Taxonomy",
        id: "taxonomy",
        accessor: x => (x.taxonomy || [])[0]
      },
      { Header: "# samples", accessor: "sampleCount" }
    ],
    aggs: [
      {
        field: "sampleCount",
        displayName: "Number of Samples",
        type: "numeric"
      }
    ],
    Container: GenomesContainer,
    AggContainer: GenomesAggregationContainer
  }
});

export default searchConfig;
