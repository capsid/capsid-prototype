import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

import { logout } from "@capsid/reducers/reduceUser";
import { logoutAll } from "@capsid/services/login";

const Logout = ({ dispatch, client, history, Component = "button" }) => (
  <Component
    onClick={() => {
      logoutAll().then(() => {
        client.resetStore();
        dispatch(logout());
        history.push("/");
      });
    }}
  >
    Logout
  </Component>
);

export default connect()(withRouter(withApollo(Logout)));
