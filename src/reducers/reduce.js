import { combineReducers } from 'redux'

import reduceUser from './reduceUser'

let reducers = {
  user: reduceUser,
}

let finalReducer = combineReducers(reducers)

export default finalReducer
