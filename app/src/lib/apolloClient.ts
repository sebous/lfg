import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
  ApolloLink,
  Resolvers,
  gql,
  makeVar,
} from "@apollo/client";
import { getMainDefinition, Observable } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { RetryLink } from "apollo-link-retry";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../hooks/useLogin";
import { Platform } from "react-native";
import { apolloCache, isAuthVar } from "./apolloCache";

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

interface ResponseError {
  statusCode: number;
  bodyText: string;
}
const retryLink = new RetryLink({
  delay: {
    initial: 0,
  },
  attempts: {
    max: 5,
    retryIf: (error: ResponseError, operation) => {
      if (error.statusCode === 401) {
        return new Promise((resolve, reject) => {
          SecureStore.getItemAsync(REFRESH_TOKEN)
            .then((refreshToken) => {
              if (!refreshToken) {
                isAuthVar(false);
                reject(false);
              } else {
                fetch(`${SERVER_URL}/refresh_token`, {
                  body: JSON.stringify({ refreshToken }),
                })
                  .then((res) => res.json())
                  .then((data) => SecureStore.setItemAsync(ACCESS_TOKEN, data.access_token))
                  .then(() => resolve(true))
                  .catch((err) => {
                    console.log("retryLink error: ", err);
                    reject(false);
                  });
              }
            })
            .catch((err) => {
              console.log("retryLink error: ", err);
              reject(false);
            });
        });
      }
      return false;
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, name, path }) => {
      console.log("graphqlerror from apollo", message, name);
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
  link: ApolloLink.from([authLink, errorLink as any, link]),
});
