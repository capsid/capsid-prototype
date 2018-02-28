let {
  REACT_APP_API_ROOT,
  REACT_APP_GOOGLE_APP_ID,
  REACT_APP_DEFAULT_REDIRECT_URI,
  REACT_APP_LOGIN_REDIRECT_NOT_REQUIRED
} = process.env;

export const apiRoot = REACT_APP_API_ROOT;

export const googleAppId = REACT_APP_GOOGLE_APP_ID;

export const defaultRedirectUri = REACT_APP_DEFAULT_REDIRECT_URI;
export const allRedirectUris = REACT_APP_LOGIN_REDIRECT_NOT_REQUIRED.split(",")
  .concat(defaultRedirectUri)
  .filter(Boolean);
