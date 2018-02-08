import React from "react";
import { connect } from "react-redux";

const Home = ({ user }) => (
  <div className="App">
    <h1>Welcome to Capsid</h1>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>
);

export default connect(state => ({
  user: state.user
}))(Home);
