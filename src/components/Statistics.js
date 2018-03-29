import React from "react";
import ReactTooltip from "react-tooltip";
import humanize from "humanize-string";

const Statistics = ({
  content: {
    createdAt,
    ownerId,
    project,
    projectId,
    projectLabel,
    sample,
    sampleId,
    updatedAt,
    ownerType,
    __v,
    _id,
    uid = `statistics_${_id}`,
    ...x
  },
  label
}) => (
  <div>
    <span data-tip data-for={uid}>
      {label}
    </span>
    <ReactTooltip id={uid} place="left">
      {Object.keys(x).map(k => (
        <dt key={k}>
          {humanize(k)}:{" "}
          {Array.isArray(x[k])
            ? x[k].join(", ")
            : typeof x[k] === "number" ? Math.round(x[k] * 100) / 100 : x[k]}
        </dt>
      ))}
    </ReactTooltip>{" "}
  </div>
);

export default Statistics;
