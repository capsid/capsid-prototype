import { combineReducers } from "redux";

import reduceUser from "@capsid/reducers/reduceUser";
import reduceSearch from "@capsid/reducers/reduceSearch";

let reducers = {
  user: reduceUser,
  search: reduceSearch
};

let finalReducer = combineReducers(reducers);

export default finalReducer;
