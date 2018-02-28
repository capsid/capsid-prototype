import React from "react";
import { connect } from "react-redux";

const LoggedIn = ({ token, children }) => (token ? children : <div />);

export default connect(state => ({
  token: state.user.token
}))(LoggedIn);
