import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

import { logout } from "../reducers/reduceUser";
import { logoutAll } from "../services/login";

const Logout = ({ dispatch, client, history }) => (
  <button
    onClick={() => {
      logoutAll().then(() => {
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
