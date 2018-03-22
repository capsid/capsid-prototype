import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Box } from "grid-styled";
import {
  Button,
  Icon,
  Navbar,
  NavbarGroup,
  NavbarDivider
} from "@blueprintjs/core";

import { LoggedIn } from "@capsid/components/access";
import LogoutButton from "@capsid/components/LogoutButton";

const EnhancedNavLink = withRouter(
  ({
    location,
    to,
    children,
    rootPath = x => x.split("/").filter(Boolean)[0],
    isActive = (x, l) => rootPath(l.pathname) === x
  }) => (
    <NavLink to={to}>
      <Button className="pt-minimal" active={isActive(rootPath(to), location)}>
        {children}
      </Button>
    </NavLink>
  )
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
          Component={props => (
            <Button className="pt-minimal" iconName="power" {...props} />
          )}
        />
      </NavbarGroup>
    </LoggedIn>
  </Navbar>
);

export default connect(state => ({
  profile: state.user.profile
}))(Header);
