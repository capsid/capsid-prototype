import React from "react";
import { Button } from "@blueprintjs/core";

export default ({ children, ...props }) => (
  <Button className="pt-minimal" {...props}>
    {children}
  </Button>
);
