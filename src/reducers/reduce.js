import { combineReducers } from "redux";

import reduceUser from "@capsid/reducers/reduceUser";

let reducers = {
  user: reduceUser
};

let finalReducer = combineReducers(reducers);

export default finalReducer;
