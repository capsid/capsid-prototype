import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { compose } from "recompose";
import urlJoin from "url-join";

import App from "./components/App";
import finalReducer from "./reducers/reduce";
import { apiRoot } from "./common/injectGlobals";

import "./index.css";

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(finalReducer);

const tokenLink = setContext((_, { headers }) => ({
  headers: { ...headers, token: localStorage.getItem("token") || "" }
}));

const link = tokenLink.concat(
  createPersistedQueryLink().concat(
    createHttpLink({ uri: urlJoin(apiRoot, "graphql") })
  )
);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
