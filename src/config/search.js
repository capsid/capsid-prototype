import {
  ProjectsContainer,
  ProjectsAggregationContainer,
  SamplesContainer,
  SamplesAggregationContainer
} from "../components/containers";

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
  }
});

export default searchConfig;
