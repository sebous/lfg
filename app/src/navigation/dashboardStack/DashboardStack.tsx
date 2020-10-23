import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardParamList } from "./DashboardParamList";
import { Dashboard } from "../../screens/Dashboard";
import { Place } from "../../screens/Place";
import { UserProfile } from "../../screens/UserProfile";
import { AppColors } from "../../styles/colors";
import { stackScreenOptions } from "../stackCommon";

interface DashboardStackProps {}

const Stack = createStackNavigator<DashboardParamList>();

export const DashboardStack: React.FC<DashboardStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ ...stackScreenOptions }}>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "LFG" }} />
      <Stack.Screen
        name="Place"
        component={Place}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};
