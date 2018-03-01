import { compose } from "recompose";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import finalReducer from "@capsid/reducers/reduce";

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const reduxStore = finalCreateStore(finalReducer);

export default reduxStore;
