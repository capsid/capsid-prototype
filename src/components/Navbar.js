import React from "react";
import { compose } from "recompose";
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

const enhance = compose(
  withRouter,
  connect(state => ({
    profile: state.user.profile
  }))
);

const ActiveStyleNavLink = props => (
  <NavLink activeStyle={{ color: "red" }} {...props} />
);

const rootPath = x => x.split("/").filter(Boolean)[0];
const isActive = x => (m, l) => rootPath(l.pathname) === x;

const Header = ({ profile, location: { pathname } }) => (
  <Navbar>
    <NavbarGroup>
      <NavLink to="/">CaPSID</NavLink>
      <NavbarDivider />
      <LoggedIn>
        <ActiveStyleNavLink isActive={isActive("search")} to="/search/projects">
          Search
        </ActiveStyleNavLink>
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

export default enhance(Header);
