import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardParamList } from "./DashboardParamList";
import { Dashboard } from "../../screens/Dashboard";
import { Place } from "../../screens/Place";
import { UserProfile } from "../../screens/UserProfile";

interface DashboardStackProps {}

const Stack = createStackNavigator<DashboardParamList>();

export const DashboardStack: React.FC<DashboardStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Place" component={Place} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};
