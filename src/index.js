import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { Provider as UrqlProvider, Client } from "urql";

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

const client = new ApolloClient({
  link: new HttpLink({ uri: urlJoin(apiRoot, "graphql") }),
  cache: new InMemoryCache()
});

const urqlClient = new Client({
  url: urlJoin(apiRoot, "graphql")
});

ReactDOM.render(
  <UrqlProvider client={urqlClient}>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  </UrqlProvider>,
  document.getElementById("root")
);
