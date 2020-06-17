import { InMemoryCache, HttpLink, ApolloClient, split } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  // uri: "http://localhost:4000/graphql",
  uri: `http://${process.env.REACT_APP_LOCAL_IP || "localhost"}:4000/graphql`,
  credentials: "include",
});
const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_LOCAL_IP || "localhost"}:4000/subscriptions`,
  options: { reconnect: true },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache,
});
