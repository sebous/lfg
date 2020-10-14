import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { CenterView } from "../components/views/CenterView";
import { useLogin } from "../hooks/useLogin";
import { AppTabs } from "./appTabs/AppTabs";

export function Routes() {
  const [loading, setLoading] = useState(true);
  const { auth } = useLogin();
  useEffect(() => (auth ? setLoading(false) : undefined), [auth]);

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
  }

  return <AppTabs />;
}
