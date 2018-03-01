import "babel-polyfill";

import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "@capsid/components/App";
import { apolloClient, reduxStore } from "@capsid/services";
import { googleAppId } from "@capsid/common/injectGlobals";

import "./index.css";

const gapi = global.gapi;
gapi.load("auth2", () => gapi.auth2.init({ client_id: googleAppId }));

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
