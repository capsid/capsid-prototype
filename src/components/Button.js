import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core";

const AnchorButton = ({ href, iconName, children, className, ...props }) => (
  <Link
    to={href}
    className={`pt-minimal pt-button ${iconName &&
      `pt-icon-${iconName}`} ${className}`}
    role="button"
  >
    {children}
  </Link>
);

const types = {
  button: Button,
  anchor: AnchorButton
};

export default ({
  type = "button",
  Component = types[type],
  children,
  ...props
}) => (
  <Component className="pt-minimal" {...props}>
    {children}
  </Component>
);
