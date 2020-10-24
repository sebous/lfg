import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";

// const httpLink = createHttpLink({
//   credentials: "include",
// });

const uploadLink = createUploadLink({
  credentials: "include",
  uri: "http://192.168.0.157:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://192.168.0.157:4000/subscriptions",
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
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  link,
});
