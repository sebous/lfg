import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from "./AppParamList";
import { Chat } from "../../screens/Chat";
import { DashboardStack } from "../dashboardStack/DashboardStack";
import { ChatStack } from "../chatStack/ChatStack";

interface AppTabsProps {}

const Stack = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardStack} />
      <Stack.Screen name="Chat" component={ChatStack} />
    </Stack.Navigator>
  );
};
