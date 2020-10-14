import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { Dashboard } from "../../screens/Dashboard";
import { Chat } from "../../screens/Chat";

interface AppTabsProps {}

const Stack = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
