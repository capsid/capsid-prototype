import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logout } from "../reducers/reduceUser";
import { logoutAll } from "../services/login";

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const Logout = ({ dispatch, history }) => (
  <button
    onClick={() =>
      Promise.race([logoutAll(), wait(2)]).then(() => {
        dispatch(logout());
        history.push("/");
      })
    }
  >
    Logout
  </button>
);

export default connect()(withRouter(Logout));
