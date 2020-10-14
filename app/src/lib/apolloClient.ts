import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  // uri: "http://localhost:4000/graphql",
  uri: `http://192.168.0.157:4000/graphql`,
  credentials: "include",
});
const wsLink = new WebSocketLink({
  uri: `ws://192.168.0.157:4000/subscriptions`,
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

export const apolloClient = new ApolloClient({
  link,
  cache,
});
