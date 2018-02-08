import React from "react";
import { connect } from "react-redux";

const Home = ({ profile }) => (
  <div className="App">
    <h1>Welcome to Capsid</h1>
    <div>You are: {profile.firstName} {profile.lastName} {profile.email}</div>
  </div>
);

export default connect(state => ({
  profile: state.user.profile,
}))(Home);
