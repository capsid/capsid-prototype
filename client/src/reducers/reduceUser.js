import u from "updeep";

import { user as actions } from "../actions";

const getUserLocalStorage = () => ({
  token: localStorage.getItem("token"),
  profile: localStorage.getItem("profile")
});

const setUserLocalStorage = ({ token, profile }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("profile", profile);
};

// ============================================================================
// User Action Creators
// ============================================================================

export const login = ({ profile, token }) => ({
  type: actions.LOGIN,
  payload: { profile, token }
});

export const logout = () => ({ type: actions.LOGOUT });

// ============================================================================
// User Reducer
// ============================================================================

const defaultState = {
  ...getUserLocalStorage()
};

export default function(state = defaultState, action) {
  let update;
  switch (action.type) {
    case actions.LOGIN:
      setUserLocalStorage(action.payload);
      update = action.payload;
      break;

    case actions.LOGOUT:
      update = { token: null, profile: null };
      setUserLocalStorage(update);
      break;

    default:
      break;
  }

  return update ? u(update, state) : state;
}
