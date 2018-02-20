import React from "react";
import { compose } from "recompose";
import { withRouter, NavLink } from "react-router-dom";
import _ from "lodash";
import humanize from "string-humanize";
import queryString from "query-string";

import { currentFilterValue } from "@arranger/components/dist/SQONView/utils";
import TextFilter from "@arranger/components/dist/TextFilter";
import CurrentSQON from "@arranger/components/dist/Arranger/CurrentSQON";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

import AggPanel from "./AggPanel";
import Table from "./Table";
import searchConfig from "../config/search";
import {
  mapNodes,
  withEsQuery,
  withParams,
  withSQON,
  withUpdateSQON
} from "../utils";

const enhance = compose(
  withRouter,
  withParams,
  withSQON,
  withUpdateSQON,
  withEsQuery
);

const Search = ({
  match: { params: { tab } },
  esQuery,
  location,
  history,
  params,
  sqon,
  updateSQON
}) => {
  const config = searchConfig[tab];
  if (!config) return null;
  const sort = params.sort ? _.flatten([params.sort]) : config.defaultSort;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300 }}>
        <config.AggContainer config={config.aggs}>
          {aggs => <AggPanel {...aggs} sqon={sqon} updateSQON={updateSQON} />}
        </config.AggContainer>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ padding: 10 }}>
          {Object.keys(searchConfig)
            .map(key => ({ key, pathname: `/search/${key}` }))
            .map(({ key, pathname }) => (
              <NavLink
                key={key}
                isActive={() => tab === key}
                activeStyle={{ color: "red" }}
                style={{ marginLeft: 10 }}
                to={{
                  pathname,
                  search: pathname === location.pathname ? location.search : ""
                }}
              >
                {humanize(key)}
              </NavLink>
            ))}
        </div>
        <CurrentSQON sqon={sqon} setSQON={updateSQON} />
        <TextFilter
          value={currentFilterValue(sqon)}
          onChange={({ generateNextSQON }) => {
            updateSQON(
              generateNextSQON({ sqon, fields: config.filterColumns })
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
              <div style={{ display: "flex" }}>
                <button
                  style={{ marginRight: "auto" }}
                  onClick={() => refetch()}
                >
                  First Page
                </button>
                {hasNextPage && (
                  <button style={{ marginLeft: "auto" }} onClick={loadMore}>
                    Next Page
                  </button>
                )}
              </div>
            </div>
          )}
        </config.Container>
      </div>
    </div>
  );
};

export default enhance(Search);
