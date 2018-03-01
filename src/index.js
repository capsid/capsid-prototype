import "babel-polyfill";

import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "@capsid/components/App";
import { apolloClient, reduxStore } from "@capsid/services";

import "./index.css";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
