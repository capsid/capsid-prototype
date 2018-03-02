import React from "react";
import { compose } from "recompose";
import { withRouter, Link, NavLink } from "react-router-dom";
import _ from "lodash";
import humanize from "string-humanize";
import queryString from "query-string";
import styled from "react-emotion";

import { currentFilterValue } from "@arranger/components/dist/SQONView/utils";
import TextFilter from "@arranger/components/dist/TextFilter";
import CurrentSQON from "@arranger/components/dist/Arranger/CurrentSQON";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

import AggPanel from "@capsid/components/AggPanel";
import Table from "@capsid/components/Table";
import searchConfig from "@capsid/config/search";

import {
  mapNodes,
  withEsQuery,
  withParams,
  withSQON,
  withUpdateSQON
} from "@capsid/utils";

const enhance = compose(
  withRouter,
  withParams,
  withSQON,
  withUpdateSQON,
  withEsQuery
);

const configWithLink = searchConfig({
  CellLink: ({ to, value }) => <Link to={to}>{value}</Link>
});

const Flex = styled("div")`
  display: flex;
`;

const LeftSidebar = styled("div")`
  width: 300px;
`;

const MainPanel = styled("div")`
  flex-grow: 1;
`;

const Tabs = styled("div")`
  padding: 10px;
`;

const ActiveStyleNavLink = props => (
  <NavLink activeStyle={{ color: "red" }} {...props} />
);

const TabLink = styled(ActiveStyleNavLink)`
  margin-left: 10px;
`;

const LeftButton = styled("button")`
  margin-right: auto;
`;

const RightButton = styled("button")`
  margin-left: auto;
`;

const OldSearch = ({
  match: { params: { tab } },
  esQuery,
  location,
  history,
  params,
  sqon,
  updateSQON
}) => {
  const config = configWithLink[tab];
  if (!config) return null;
  const sort = params.sort ? _.flatten([params.sort]) : config.defaultSort;
  return (
    <Flex>
      <LeftSidebar>
        <config.AggContainer config={config.aggs}>
          {aggs => <AggPanel {...aggs} sqon={sqon} updateSQON={updateSQON} />}
        </config.AggContainer>
      </LeftSidebar>
      <MainPanel>
        <Tabs>
          {Object.keys(configWithLink)
            .map(key => ({ key, pathname: `/oldsearch/${key}` }))
            .map(({ key, pathname }) => (
              <TabLink
                key={key}
                isActive={() => tab === key}
                to={{
                  pathname,
                  search: pathname === location.pathname ? location.search : ""
                }}
              >
                {humanize(key)}
              </TabLink>
            ))}
        </Tabs>
        <CurrentSQON sqon={sqon} setSQON={updateSQON} />
        <TextFilter
          value={currentFilterValue(sqon)}
          onChange={({ generateNextSQON }) => {
            updateSQON(
              generateNextSQON({
                sqon,
                fields: config.filterColumns.map(x => `${x}.search`)
              })
            );
          }}
        />
        <config.Container first={20} sort={sort} query={esQuery}>
          {({
            data: {
              items: { nodes, count, pageInfo: { hasNextPage } },
              loading,
              refetch
            },
            loadMore
          }) => (
            <div>
              <Table
                data={mapNodes(nodes)}
                columns={config.columns}
                updateSort={({ sort }) =>
                  history.push({
                    search: queryString.stringify({ ...params, sort })
                  })
                }
                sort={sort}
              />
              <Flex>
                <LeftButton onClick={() => refetch()}>First Page</LeftButton>
                {hasNextPage && (
                  <RightButton onClick={loadMore}>Next Page</RightButton>
                )}
              </Flex>
            </div>
          )}
        </config.Container>
      </MainPanel>
    </Flex>
  );
};

export default enhance(OldSearch);
