import u from "updeep";

import { user as actions } from "../actions";

// ============================================================================
// User Action Creators
// ============================================================================

export const setLoggedInUser = ({ profile, token }) => ({
  type: actions.SET_LOGGED_IN_USER,
  payload: { profile, token }
});

// ============================================================================
// User Reducer
// ============================================================================

const defaultState = {
  user: {
    token: null,
    profile: null
  }
};

export default function(state = defaultState, action) {
  let update;
  switch (action.type) {
    // ------------------------------------------------------------------------
    case actions.SET_LOGGED_IN_USER:
      update = action.payload;
      break;

    default:
      break;
  }

  return update ? u(update, state) : state;
}
