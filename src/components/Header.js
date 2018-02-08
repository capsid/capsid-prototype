import React from "react";
import { connect } from "react-redux";

import LogoutButton from "./LogoutButton";

const Header = ({ profile }) => (
  <header>
    <h1>Welcome to Capsid</h1>
    {profile && (
      <div>
        You are: {profile.firstName} {profile.lastName} {profile.email}
        <LogoutButton />
      </div>
    )}
  </header>
);

export default connect(state => ({
  profile: state.user.profile
}))(Header);
