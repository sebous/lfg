import { useReactiveVar } from "@apollo/client";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { CenterView } from "../components/views/CenterView";
import { useLogin } from "../hooks/useLogin";
import { isAuthVar } from "../lib/apolloCache";
import { AppColors } from "../styles/colors";
import { RootStack } from "./rootStack/RootStack";

export function Routes() {
  useLogin();
  const isAuth = useReactiveVar(isAuthVar);

  if (!isAuth) {
    return (
      <CenterView>
        <ActivityIndicator size="large" />
      </CenterView>
    );
  }

  return (
    <View style={{ backgroundColor: AppColors.DARK_BACKGROUND, flex: 1 }}>
      <RootStack />
    </View>
  );
}
