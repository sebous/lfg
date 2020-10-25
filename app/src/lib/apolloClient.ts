import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";

export const SERVER_URL = "192.168.0.157:4000";

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
