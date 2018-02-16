import React from "react";
import { connect } from "react-redux";

import LogoutButton from "./LogoutButton";

const Header = ({ profile }) => (
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
      <span>Capsid 2.0</span>
      {profile && (
        <div style={{ marginLeft: "auto" }}>
          {profile.email}
          <LogoutButton />
        </div>
      )}
    </div>
  </header>
);

export default connect(state => ({
  profile: state.user.profile
}))(Header);
