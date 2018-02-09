export const nested = ["files"];

export const aggs = [
  {
    field: "gender",
    displayName: "Gender",
    type: "Aggregations"
  },
  {
    field: "files.size",
    displayName: "File Size",
    type: "NumericAggregations"
  }
];
