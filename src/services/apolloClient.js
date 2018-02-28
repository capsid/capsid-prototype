import { ApolloClient } from "apollo-client";
import { concat } from "apollo-link";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import urlJoin from "url-join";

import { apiRoot } from "../common/injectGlobals";
import { history } from ".";

const error = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      switch (message) {
        case "User not found": // TODO: use apollo extraInfo??
          history.push("/login");
          break;
        default:
          console.log(`[GraphQL error]: Message: ${message}`);
          break;
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const context = setContext((_, { headers }) => ({
  headers: { ...headers, token: localStorage.getItem("token") || "" }
}));

const persisted = createPersistedQueryLink();

const linkMiddleware = concat(error, context, persisted);

const httpLink = createHttpLink({ uri: urlJoin(apiRoot, "graphql") });

const client = new ApolloClient({
  link: linkMiddleware.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
