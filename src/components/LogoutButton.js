import React from "react";
import { connect } from "react-redux";

import { logout } from "../reducers/reduceUser";

const Logout = ({ dispatch }) => (
  <button onClick={() => dispatch(logout())}>Logout</button>
);

export default connect()(Logout);
