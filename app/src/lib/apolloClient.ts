import { ApolloClient, split, ApolloLink } from "@apollo/client";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { RetryLink } from "apollo-link-retry";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../hooks/useLogin";
import { apolloCache, isAuthVar, userInfoVar } from "./apolloCache";

// TODO: create something like env.ts for handling environments

export const LOCAL_SERVER_URL = "192.168.0.200:4000";
export const PRODUCTION_SERVER_URL = "68.183.213.48";

export const SERVER_URL = __DEV__ ? LOCAL_SERVER_URL : PRODUCTION_SERVER_URL;
// export const SERVER_URL = PRODUCTION_SERVER_URL;

const uploadLink = createUploadLink({
  credentials: "include",
  uri: `http://${SERVER_URL}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${SERVER_URL}/subscriptions`,
  options: { reconnect: true },
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: accessToken,
    },
  };
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
  },
});

let isRefreshing = false;

const errorLink = onError(({ graphQLErrors, networkError, operation, response, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, name, path }) => {
      if (message === "401") {
        (async () => {
          try {
            if (isRefreshing) return;
            isAuthVar(false);
            console.log("401 executing");
            const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN);
            if (!refreshToken) return;

            isRefreshing = true;
            const response = await fetch(`http://${SERVER_URL}/refresh_token`, {
              method: "POST",
              body: JSON.stringify({ refreshToken }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            if (data.access_token) {
              console.log("setting ACCESS_TOKEN", data);
              await SecureStore.setItemAsync(ACCESS_TOKEN, data.access_token);
              isRefreshing = false;
              isAuthVar(true);
            }
          } catch (err) {
            isRefreshing = false;
            console.log(err);
            userInfoVar(undefined);
            isAuthVar(false);
          }
        })();
      }
      console.log("graphqlerror from apollo", message);
    });
  }
  if (networkError) console.log("apollo network error", networkError);
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink as any,
  uploadLink,
);

export const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: ApolloLink.from([retryLink, authLink, errorLink as any, link]),
});
