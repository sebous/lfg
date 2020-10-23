import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";
import { RetryLink } from "apollo-link-retry";
import { ApolloLink } from "apollo-link";

const httpLink = createHttpLink({
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
  httpLink,
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
