import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

import { logout } from "../reducers/reduceUser";
import { logoutAll } from "../services/login";

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const Logout = ({ dispatch, client, history }) => (
  <button
    onClick={() => {
      Promise.race([logoutAll(), wait(2)]).then(() => {
        client.resetStore();
        dispatch(logout());
        history.push("/");
      });
    }}
  >
    Logout
  </button>
);

export default connect()(withRouter(withApollo(Logout)));
