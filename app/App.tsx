import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Routes } from "./src/navigation/Routes";
import { apolloClient } from "./src/lib/apolloClient";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
  );
}
