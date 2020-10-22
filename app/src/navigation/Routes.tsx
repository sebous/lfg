import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { CenterView } from "../components/views/CenterView";
import { useLogin } from "../hooks/useLogin";
import { AppTabs } from "./appTabs/AppTabs";
import { RootStack } from "./rootStack/RootStack";

export function Routes() {
  const { auth } = useLogin();

  if (!auth) {
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
  }

  return <RootStack />;
}