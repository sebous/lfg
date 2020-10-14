import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";

const httpLink = createHttpLink({
  credentials: "include",
  uri: "http://192.168.0.157:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "http://192.168.0.157:4000/subscriptions",
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

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache,
  link,
});
