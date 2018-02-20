import { ProjectContainer, ProjectAggregationContainer } from "./containers";

export default {
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
};
