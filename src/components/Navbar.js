import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Box } from "grid-styled";
import { Icon, Navbar, NavbarGroup, NavbarDivider } from "@blueprintjs/core";

import { rootPath } from "@capsid/utils";
import Button from "@capsid/components/Button";
import { LoggedIn } from "@capsid/components/access";
import LogoutButton from "@capsid/components/LogoutButton";

const EnhancedNavLink = withRouter(
  ({
    location: { pathname },
    to,
    children,
    isActive = x => rootPath(pathname) === rootPath(x)
  }) => (
    <NavLink to={to}>
      <Button active={isActive(to)}>{children}</Button>
    </NavLink>
  )
);

const enhance = compose(
  withRouter, // req'd so connect doesn't stop route change from re-render
  connect(state => ({
    profile: state.user.profile
  }))
);

const Header = ({ profile }) => (
  <Navbar>
    <NavbarGroup>
      <EnhancedNavLink to="/">CaPSID</EnhancedNavLink>
      <NavbarDivider />
      <LoggedIn>
        <EnhancedNavLink to="/search/projects">Search</EnhancedNavLink>
      </LoggedIn>
    </NavbarGroup>
    <LoggedIn>
      <NavbarGroup align="right">
        <NavbarDivider />
        <Icon iconName="person" />
        <Box ml={2}>{profile && profile.email}</Box>
        <NavbarDivider />
        <LogoutButton
          Component={props => <Button iconName="power" {...props} />}
        />
      </NavbarGroup>
    </LoggedIn>
  </Navbar>
);

export default enhance(Header);
