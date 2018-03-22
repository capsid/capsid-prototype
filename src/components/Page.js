import React from "react";
import { withRouter } from "react-router";
import { withLastLocation } from "react-router-last-location";
import { Flex, Box } from "grid-styled";
import { Spinner } from "@blueprintjs/core";
import capitalize from "capitalize";

import { rootPath } from "@capsid/utils";
import Button from "@capsid/components/Button";

const Page = ({
  children,
  header,
  history,
  lastLocation = { pathname: "/search/jordan" },
  loading
}) => (
  <Flex justifyContent="center">
    <Box mt={4} width={[1, 1, 2 / 3, 1 / 2]}>
      {loading && <Spinner />}
      {!loading && (
        <Box>
          {header && <h4>{header}</h4>}
          {children}
          {lastLocation && (
            <Box mt={4}>
              <Button
                iconName="arrow-left"
                onClick={() => history.push(lastLocation)}
              >
                Back to {capitalize(rootPath(lastLocation.pathname))}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  </Flex>
);

export default withLastLocation(withRouter(Page));
