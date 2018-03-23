import React from "react";
import { Flex, Box } from "grid-styled";
import { Card } from "@blueprintjs/core";

export default ({ children }) => (
  <Flex justifyContent="center">
    <Box mt={200} width={500}>
      <Card>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Flex>
      </Card>
    </Box>
  </Flex>
);
