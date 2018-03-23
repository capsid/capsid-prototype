import namespace from "./namespace";

export const user = namespace(`user`, [`LOGIN`, `LOGOUT`]);
export const search = namespace(`search`, [`SAVE_LAST_SQON`, `SAVE_LAST_TAB`]);
