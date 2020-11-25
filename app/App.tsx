import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { apolloClient } from "./src/lib/apolloClient";
import { Routes } from "./src/navigation/Routes";
import { UserProvider } from "./src/providers/UserProvider";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Routes />
        </NavigationContainer>
      </UserProvider>
    </ApolloProvider>
  );
}
