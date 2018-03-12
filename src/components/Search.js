import React from "react";
import rison from "rison";
import { compose, withPropsOnChange } from "recompose";
import { withRouter } from "react-router";
import queryString from "query-string";
import { Flex, Box } from "grid-styled";
import { Link, NavLink } from "react-router-dom";
import _, { debounce } from "lodash";
import urlJoin from "url-join";
import capitalize from "capitalize";

import CurrentSQON from "@arranger/components/dist/Arranger/CurrentSQON";
import { currentFilterValue } from "@arranger/components/dist/SQONView/utils";
import "@arranger/components/public/themeStyles/beagle/beagle.css"; // TODO

import { addInSQON, updateParams, withParams } from "@capsid/utils";

import AggPanel from "@capsid/components/AggPanel";

import ProjectsTab from "@capsid/components/ProjectsTab";
import SamplesTab from "@capsid/components/SamplesTab";
import AlignmentsTab from "@capsid/components/AlignmentsTab";
import GenomesTab from "@capsid/components/GenomesTab";

import SearchProjectContainer from "@capsid/components/containers/SearchProjectContainer";
import SearchSampleContainer from "@capsid/components/containers/SearchSampleContainer";
import SearchAlignmentContainer from "@capsid/components/containers/SearchAlignmentContainer";
import SearchGenomeContainer from "@capsid/components/containers/SearchGenomeContainer";

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
  samples: [{ displayName: "Disease", field: "cancer", type: "terms" }],
  genomes: [{ displayName: "Genome Length", field: "length", type: "stats" }]
};

const defaultSQON = { op: "and", content: [] };

const { decode, encode } = rison;

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

const enhance = compose(
  withRouter,
  withParams,
  withPropsOnChange(["params"], ({ params }) => {
    const updateSQON = nextSQON => updateParams({ sqon: encode(nextSQON) });
    return {
      sqon: params.sqon ? decode(params.sqon) : defaultSQON,
      updateSQON,
      debouncedUpdateSQON: debounce(updateSQON, 500)
    };
  })
);

const Search = ({
  match: { params: { tab } },
  params: { filter = "", ...params },
  sqon,
  updateSQON,
  debouncedUpdateSQON,
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
            loading={loading}
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
                updateSQON(
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
