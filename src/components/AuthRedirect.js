import React from "react";
import { connect } from "react-redux";
import queryString from "querystring";
import urlJoin from "url-join";

import Login from "@capsid/components/Login";

const AuthRedirect = props => {
  const { token, location: { search } } = props;
  const qs = queryString.parse(search.replace(/^\?/, ""));
  if (token) {
    global.location = urlJoin(qs.redirect_uri, `?token=${token}`);
    return null;
  } else {
    return <Login {...props} shouldNotRedirect={true} />;
  }
};

export default connect(state => ({ token: state.user.token }))(AuthRedirect);
