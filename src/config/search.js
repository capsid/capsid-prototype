import {
  ProjectContainer,
  ProjectAggregationContainer,
  SampleContainer,
  SampleAggregationContainer
} from "../components/containers";

export default {
  projects: {
    defaultSort: ["name__asc"],
    filterColumns: ["name", "description", "label", "wikiLink"],
    columns: [
      { Header: "Name", accessor: "name" },
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
    Container: ProjectContainer,
    AggContainer: ProjectAggregationContainer
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
      { Header: "Name", accessor: "name" },
      { Header: "Description", accessor: "description", sortable: false },
      { Header: "Cancer", accessor: "cancer" },
      { Header: "Source", accessor: "source" },
      { Header: "Project Label", accessor: "projectLabel", sortable: false },
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
    Container: SampleContainer,
    AggContainer: SampleAggregationContainer
  }
};
