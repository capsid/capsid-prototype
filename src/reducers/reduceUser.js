import u from "updeep";

import { user as actions } from "@capsid/actions";

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

export const login = ({ token, ...profile }) => ({
  type: actions.LOGIN,
  payload: { token, profile }
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
