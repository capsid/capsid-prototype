import { compose } from "recompose";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import finalReducer from "../reducers/reduce";
import { history, apolloClient } from ".";

const finalCreateStore = compose(
  applyMiddleware(thunk.withExtraArgument({ history, apolloClient })),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const reduxStore = finalCreateStore(finalReducer);

export default reduxStore;
