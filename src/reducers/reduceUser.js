import jwtDecode from "jwt-decode";
import u from "updeep";

import { user as actions } from "../actions";
import { logoutAll } from "../services/login";

// ============================================================================
// User Helpers
// ============================================================================

const getUserLocalStorage = () => {
  let token = null,
    profile = null;
  try {
    token = localStorage.getItem("token");
    profile = JSON.parse(localStorage.getItem("profile"));
  } catch (e) {
    token = profile = null;
  }
  return { token, profile };
};

const setUserLocalStorage = ({ token, profile }) => {
  if (!token || !profile) {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  } else {
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(profile));
  }
};

// ============================================================================
// User Action Creators
// ============================================================================

export const login = token => async (dispatch, getState, { history }) => {
  const decoded = jwtDecode(token);
  await dispatch({
    type: actions.LOGIN,
    payload: { token, profile: decoded.context.user }
  });
  history.push("/");
};

export const logout = () => (dispatch, getState, { history, apolloClient }) => {
  const wait = seconds =>
    new Promise(resolve => setTimeout(resolve, seconds * 1000));
  Promise.race([logoutAll(), wait(2)]).then(() => {
    apolloClient.resetStore();
    dispatch({ type: actions.LOGOUT });
    history.push("/");
  });
};

export const refreshUserLogin = () => (dispatch, getState, { history }) => {
  history.push("/login");
};

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
