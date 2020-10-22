import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { CenterView } from "../components/views/CenterView";
import { useLogin } from "../hooks/useLogin";
import { AppColors } from "../styles/colors";
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

  return (
    <View style={{ backgroundColor: AppColors.DARK_BACKGROUND, flex: 1 }}>
      <RootStack />
    </View>
  );
}
