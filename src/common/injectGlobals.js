export const egoApiRoot = process.env.REACT_APP_EGO_API_ROOT;

export const googleAppId = process.env.REACT_APP_GOOGLE_APP_ID;
export const egoAppId = process.env.REACT_APP_EGO_APP_ID;

export const defaultRedirectUri = process.env.REACT_APP_DEFAULT_REDIRECT_URI;
export const allRedirectUris = process.env.REACT_APP_LOGIN_REDIRECT_NOT_REQUIRED.split(',')
  .concat(defaultRedirectUri)
  .filter(Boolean);
