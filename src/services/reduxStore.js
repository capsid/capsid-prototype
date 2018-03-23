import { compose } from "recompose";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import finalReducer from "@capsid/reducers/reduce";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const enhance = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = enhance(finalReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
