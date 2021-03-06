import u from "updeep";

import { user as actions } from "@capsid/actions";

// ============================================================================
// User Action Creators
// ============================================================================

export const login = ({ token, ...profile }) => ({
  type: actions.LOGIN,
  payload: { token, profile }
});

export const logout = () => {
  return { type: actions.LOGOUT };
};

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
      update = { token: null, profile: null };
      break;

    default:
      break;
  }

  return update ? u(update, state) : state;
}
