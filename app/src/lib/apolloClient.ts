import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";

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

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink as any,
  uploadLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Place: {
      fields: {
        joinedUsers: { merge: false },
      },
    },
    Query: {
      fields: {
        getPeopleInQueue: {
          merge: false,
        },
        getPlaces: {
          merge: false,
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  link,
});
