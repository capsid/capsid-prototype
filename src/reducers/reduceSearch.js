import u from "updeep";

import { search as actions } from "@capsid/actions";

// ============================================================================
// Search Action Creators
// ============================================================================

export const saveLastTab = tab => ({
  type: actions.SAVE_LAST_TAB,
  payload: tab
});

export const saveLastSqon = sqon => ({
  type: actions.SAVE_LAST_SQON,
  payload: sqon
});

// ============================================================================
// Search Reducer
// ============================================================================

const defaultState = {
  lastSqon: null
};

export default function(state = defaultState, action) {
  let update;
  switch (action.type) {
    case actions.SAVE_LAST_SQON:
      update = { lastSqon: action.payload };
      break;

    case actions.SAVE_LAST_TAB:
      update = { lastTab: action.payload };
      break;

    default:
      break;
  }

  return update ? u(update, state) : state;
}
