import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";

import { logout } from "../reducers/reduceUser";
import { logoutAll } from "../services/login";

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const Logout = ({ dispatch, history, client }) => (
  <button
    onClick={() =>
      Promise.race([logoutAll(), wait(2)]).then(() => {
        client.resetStore();
        dispatch(logout());
        history.push("/");
      })
    }
  >
    Logout
  </button>
);

export default connect()(withApollo(withRouter(Logout)));
