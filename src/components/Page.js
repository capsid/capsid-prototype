import React from "react";
import { withRouter } from "react-router";
import { withLastLocation } from "react-router-last-location";
import { Flex, Box } from "grid-styled";
import { Spinner } from "@blueprintjs/core";
import _ from "lodash";

import Button from "@capsid/components/Button";

const stringifyLocation = location =>
  !location
    ? ""
    : typeof location === "string"
      ? location
      : `${location.pathname}${location.search}`;

const Page = ({
  children,
  header,
  history,
  lastLocation,
  loading,
  actions = []
}) => (
  <Flex justifyContent="center">
    <Box mt={4} width={[1, 1, 2 / 3, 1 / 2]}>
      {loading && (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      )}
      {!loading && (
        <Box>
          {header && <h4>{header}</h4>}
          {children}
          <Flex justifyContent="space-around" m={4}>
            {_.uniqBy(
              actions.map(({ location, ...x }) => ({
                location: stringifyLocation(location),
                ...x
              })),
              "location"
            ).map(({ location, title, icon }) => (
              <Button
                key={location}
                type="anchor"
                href={location}
                {...icon && { iconName: icon }}
              >
                {title}
              </Button>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  </Flex>
);

export default withLastLocation(withRouter(Page));
