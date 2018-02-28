import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import LogoutButton from "./LogoutButton";

const rootPath = x => x.split("/").filter(Boolean)[0];

const enhance = compose(
  withRouter,
  connect(state => ({
    profile: state.user.profile
  }))
);

const Header = ({ profile, location: { pathname } }) => (
  <header>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 20
      }}
    >
      <div>
        <NavLink to="/">Capsid 2.0</NavLink>
        {[["Search", "/search/projects"]].map(([label, to]) => (
          <NavLink
            key={label}
            isActive={(m, l) => rootPath(l.pathname) === rootPath(to)}
            activeStyle={{ color: "red" }}
            style={{ marginLeft: 20 }}
            to={to}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div style={{ marginLeft: "auto" }}>
        {profile.email}
        <LogoutButton />
      </div>
    </div>
  </header>
);

export default enhance(Header);
