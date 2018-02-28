const gapi = global.gapi;
gapi.load("auth2");

export const googleLogout = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  if (authInstance) {
    return authInstance.signOut();
  } else {
    // already signed out
    return Promise.resolve();
  }
};

export const logoutAll = () => Promise.all([googleLogout()]);
