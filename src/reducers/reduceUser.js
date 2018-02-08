import u from "updeep";

import { user as actions } from "../actions";

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
  token: null,
  profile: null
};

export default function(state = defaultState, action) {
  let update;
  switch (action.type) {
    case actions.LOGIN:
      update = action.payload;
      break;

    case actions.LOGOUT:
      update = { token: defaultState.token, profile: defaultState.profile };
      break;

    default:
      break;
  }

  return update ? u(update, state) : state;
}
