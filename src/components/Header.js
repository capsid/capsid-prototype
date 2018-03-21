import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "react-emotion";

import LogoutButton from "@capsid/components/LogoutButton";

const enhance = compose(
  withRouter,
  connect(state => ({
    profile: state.user.profile
  }))
);

const HeaderContainer = styled("header")`
  display: flex;
  flexdirection: row;
  alignitems: flex-start;
  justifycontent: flex-start;
  padding: 20px;
`;

const ActiveStyleNavLink = props => (
  <NavLink activeStyle={{ color: "red" }} {...props} />
);

const HeaderNavLink = styled(ActiveStyleNavLink)`
  margin-left: 20px;
`;

const HeaderRight = styled("div")`
  margin-left: auto;
`;

const rootPath = x => x.split("/").filter(Boolean)[0];
const isActive = x => (m, l) => rootPath(l.pathname) === x;

const Header = ({ profile, location: { pathname } }) => (
  <div>
    <HeaderContainer>
      <div>
        <HeaderNavLink isActive={isActive("search")} to="/search/projects">
          Search
        </HeaderNavLink>
      </div>
      <HeaderRight>
        {profile.email}
        <LogoutButton />
      </HeaderRight>
    </HeaderContainer>
  </div>
);

export default enhance(Header);
