import React from "react";
import ReactTooltip from "react-tooltip";
import capitalize from "capitalize";

const Statistics = ({ content, label }) => (
  <div>
    {content.map(
      ({
        name,
        value: {
          createdAt,
          ownerId,
          project,
          projectId,
          projectLabel,
          sample,
          sampleId,
          updatedAt,
          __v,
          _id,
          ownerType,
          uid = `statistics_${_id}`,
          ...x
        }
      }) => (
        <span key={name}>
          <span data-tip data-for={uid}>
            {capitalize(name.slice(0, -1))}
          </span>
          <ReactTooltip id={uid} place="left">
            {Object.keys(x).map(k => (
              <dt key={k}>
                {k}:{" "}
                {Array.isArray(x[k])
                  ? x[k].join(", ")
                  : typeof x[k] === "number"
                    ? Math.round(x[k] * 100) / 100
                    : x[k]}
              </dt>
            ))}
          </ReactTooltip>{" "}
        </span>
      )
    )}
  </div>
);

export default Statistics;
