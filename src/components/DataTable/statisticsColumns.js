import React from "react";
import { round } from "lodash";

import Statistics from "@capsid/components/Statistics";

export const selectStatistics = value =>
  value
    ? value.find(x => x.name === "alignments") ||
      value.find(x => x.name === "samples") ||
      value.find(x => x.name === "projects") ||
      value.find(x => x.name === "genomes")
    : {};

const statisticsColumns = ({
  headerPrefix,
  columns = [
    {
      Header: "Genome Hits",
      accessor: "pathgenomeHits"
    },
    {
      Header: "Gene Hits",
      accessor: "pathgeneHits"
    },
    {
      Header: "Genome Cvg",
      isPercentage: true,
      accessor: "pathgenomeCoverage"
    },
    {
      Header: "Avg Gene Cvg",
      isPercentage: true,
      accessor: "pathgeneCoverageAvg"
    },
    {
      Header: "Max Gene Cvg",
      isPercentage: true,
      accessor: "pathgeneCoverageMax"
    }
  ]
}) => [
  {
    Header: `${headerPrefix || ""} Statistics`.trim(),
    columns: columns.map(({ Header, accessor, isPercentage }) => ({
      Header: `${Header} ${isPercentage ? "%" : ""}`,
      accessor: "statistics",
      sortable: false,
      className: "center",
      Cell: ({ value, statistics = selectStatistics(value) }) => (
        <Statistics
          content={statistics.value}
          label={
            isPercentage
              ? round(statistics.value[accessor] * 100)
              : statistics.value[accessor]
          }
        />
      )
    }))
  }
];

export default statisticsColumns;
