import React from "react";
import rison from "rison";
import { compose, withPropsOnChange, withState } from "recompose";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router";
import queryString from "query-string";
import { Flex, Box } from "grid-styled";
import { Link, NavLink } from "react-router-dom";
import _, { debounce } from "lodash";
import urlJoin from "url-join";
import capitalize from "capitalize";

import { CurrentSQON } from "@arranger/components/dist/Arranger/CurrentSQON";
import { currentFilterValue } from "@arranger/components/dist/SQONView/utils";
import "@arranger/components/public/themeStyles/beagle/beagle.css"; // TODO

import {
  addInSQON,
  updateParams,
  withParams,
  namespaceField
} from "@capsid/utils";

import AggPanel from "@capsid/components/AggPanel";
import ProjectsTab from "@capsid/components/ProjectsTab";
import SamplesTab from "@capsid/components/SamplesTab";
import AlignmentsTab from "@capsid/components/AlignmentsTab";
import GenomesTab from "@capsid/components/GenomesTab";
import SearchProjectContainer from "@capsid/components/containers/SearchProjectContainer";
import SearchSampleContainer from "@capsid/components/containers/SearchSampleContainer";
import SearchAlignmentContainer from "@capsid/components/containers/SearchAlignmentContainer";
import SearchGenomeContainer from "@capsid/components/containers/SearchGenomeContainer";
import { SearchAggCount as SearchAggCountQuery } from "@capsid/components/queries";

const containers = {
  projects: SearchProjectContainer,
  samples: SearchSampleContainer,
  alignments: SearchAlignmentContainer,
  genomes: SearchGenomeContainer
};

const tabs = {
  projects: ProjectsTab,
  samples: SamplesTab,
  alignments: AlignmentsTab,
  genomes: GenomesTab
};

const defaultSort = {
  projects: ["name__asc"],
  samples: ["name__asc"],
  alignments: ["name__asc"],
  genomes: ["name__asc"]
};

const aggConfig = {
  samples: [
    { displayName: "Disease", field: "cancer", type: "terms" },
    { displayName: "Source", field: "source", type: "terms" }
  ],
  genomes: [{ displayName: "Genome Length", field: "length", type: "stats" }],
  statistics: [
    { displayName: "Genome Hits", field: "genomeHits", type: "stats" },
    { displayName: "Gene Hits", field: "geneHits", type: "stats" },
    {
      displayName: "% Genome Coverage",
      field: "genomeCoverage",
      type: "stats",
      isPercentage: true
    },
    {
      displayName: "% Max Gene Coverage",
      field: "geneCoverageMax",
      type: "stats",
      isPercentage: true
    },
    {
      displayName: "% Avg Gene Coverage",
      field: "geneCoverageAvg",
      type: "stats",
      isPercentage: true
    }
  ]
};

const defaultSQON = { op: "and", content: [] };

const { decode, encode } = rison;

const updateSQON = nextSQON => updateParams({ sqon: encode(nextSQON) });

const debouncedUpdateSQON = debounce(updateSQON, 500);

const nextTabLocation = ({ tab, sqon }) => ({
  pathname: urlJoin("/search", tab),
  search: queryString.stringify({
    sqon: encode(sqon),
    filter: currentFilterValue(sqon, tab)
  })
});

const CellLink = ({ args: { row, value }, to, accessor = "id" }) => (
  <Link to={`/${to}/${row._original[accessor]}`}>{value}</Link>
);

const CountLink = ({ sqon, tab }) => ({
  args: { row, value, ...args },
  to
}) => {
  const items = {
    projects: [{ field: "projects.label", value: row.label }],
    samples: [
      { field: "projects.label", value: row.projectLabel },
      { field: "samples.name", value: row.name }
    ],
    alignments: [
      { field: "projects.label", value: row.projectLabel },
      { field: "samples.name", value: row.sample },
      { field: "alignments.name", value: row.name }
    ],
    genomes: [{ field: "genomes.accession", value: row.accession }]
  };
  return (
    <Link
      to={nextTabLocation({
        tab: to,
        sqon: addInSQON({ items: items[tab], sqon })
      })}
    >
      {value}
    </Link>
  );
};

const TabLink = ({ tab, to, sqon, data, ...props }) => {
  return (
    <NavLink
      isActive={() => to === tab}
      activeStyle={{ color: "red" }}
      to={nextTabLocation({ tab: to, sqon })}
      {...props}
    >
      {capitalize(to)} ({(data[to] || {}).total})
    </NavLink>
  );
};

const fetchAggData = async ({ client, sqon, config, setAggData }) => {
  let aggData = {};
  await new Promise(resolve => setTimeout(resolve, 1500));
  Object.keys(config).map(entity =>
    config[entity]
      .filter(({ type }) => type === "terms")
      .map(({ field, type }) =>
        client
          .query({
            query: SearchAggCountQuery,
            variables: {
              query: JSON.stringify(sqon),
              aggs: JSON.stringify(config),
              agg: JSON.stringify({ entity, field, type })
            }
          })
          .then(({ data: { items } }) => {
            aggData[namespaceField({ entity, field })] = items;
            setAggData(aggData);
          })
          .catch(err => console.error(err))
      )
  );
};

const enhance = compose(
  withApollo,
  withRouter,
  withParams,
  withPropsOnChange(["params"], ({ params }) => ({
    sqon: params.sqon ? decode(params.sqon) : defaultSQON
  })),
  withState("aggData", "setAggData", {}),
  withPropsOnChange(
    (props, nextProps) => !_.isEqual(props.sqon, nextProps.sqon),
    ({ sqon, client, setAggData }) =>
      fetchAggData({ client, sqon, config: aggConfig, setAggData })
  )
);

const Search = ({
  match: { params: { tab } },
  params: { filter = "", ...params },
  sqon,
  aggData,
  Tab = tabs[tab],
  Container = containers[tab],
  sort = params.sort ? _.flatten([params.sort]) : defaultSort[tab]
}) => (
  <Container
    query={JSON.stringify(sqon)}
    aggs={JSON.stringify(aggConfig)}
    size={20}
    tab={tab}
    sort={sort}
  >
    {({ data: { search, loading, refetch }, loadMore }) => (
      <Flex>
        <Box width={[1 / 2, 1 / 4, 1 / 6]}>
          <AggPanel
            aggData={aggData}
            search={search}
            config={aggConfig}
            sqon={sqon}
            updateSQON={debouncedUpdateSQON}
          />
        </Box>
        <Box width={[1 / 2, 3 / 4, 5 / 6]}>
          <Box>
            {["projects", "samples", "alignments", "genomes"].map(x => (
              <TabLink key={x} to={x} tab={tab} sqon={sqon} data={search} />
            ))}
          </Box>
          <CurrentSQON
            sqon={sqon}
            setSQON={nextSQON => {
              updateParams({ filter: currentFilterValue(nextSQON, tab) });
              updateSQON(nextSQON);
            }}
          />
          <Box>
            <Tab
              hasStatistics={search[tab].hasStatistics}
              hits={search[tab].hits}
              sort={sort}
              filter={filter}
              updateFilter={({ value, generateNextSQON, filterColumns }) => {
                updateParams({ filter: value });
                debouncedUpdateSQON(
                  generateNextSQON({
                    sqon,
                    fields: filterColumns.map(x => `${tab}.${x}.search`),
                    entity: tab
                  })
                );
              }}
              updateSort={({ sort }) => updateParams({ sort })}
              CellLink={CellLink}
              CountLink={CountLink({ sqon, tab })}
            />
            <button onClick={() => refetch()}>First Page</button>
            <button onClick={() => loadMore(tab)}>Next Page</button>
          </Box>
        </Box>
      </Flex>
    )}
  </Container>
);

export default enhance(Search);
