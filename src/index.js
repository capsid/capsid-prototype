import 'babel-polyfill';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { compose } from "recompose";
import { createStore } from "redux";

import App from "./components/App";
import finalReducer from "./reducers/reduce";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const STORE = finalCreateStore(finalReducer);

ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
