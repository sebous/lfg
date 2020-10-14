import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { apolloClient } from "./src/lib/apolloClient";
import { Routes } from "./src/navigation/Routes";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
  );
}
