const gapi = global.gapi;

export const googleLogout = () => gapi.auth2.getAuthInstance().signOut();

export const logoutAll = () => Promise.all([googleLogout()]);
