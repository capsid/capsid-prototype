import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { compose } from "recompose";
import { createStore } from "redux";
import { Provider as UrqlProvider, Client } from "urql";
import urlJoin from "url-join";

import App from "./components/App";
import finalReducer from "./reducers/reduce";
import registerServiceWorker from "./registerServiceWorker";
import { apiRoot } from "./common/injectGlobals";

import "./index.css";

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(finalReducer);
const client = new Client({
  url: urlJoin(apiRoot, "graphql")
});

ReactDOM.render(
  <UrqlProvider client={client}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </UrqlProvider>,
  document.getElementById("root")
);
registerServiceWorker();
