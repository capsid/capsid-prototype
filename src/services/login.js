import urlJoin from "url-join";
import withParams from "with-query";

import { egoAppId, egoApiRoot } from "../common/injectGlobals";

const gapi = global.gapi;
gapi.load("auth2");

export const googleLogin = token =>
  fetch(
    withParams(urlJoin(egoApiRoot, "oauth/google/token"), {
      client_id: egoAppId
    }),
    {
      method: "GET",
      headers: { token }
    }
  );

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
