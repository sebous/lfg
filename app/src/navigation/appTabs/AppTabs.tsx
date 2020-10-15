import React from "react";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AppParamList } from "./AppParamList";
import { DashboardStack } from "../dashboardStack/DashboardStack";
import { ChatStack } from "../chatStack/ChatStack";
import { useNavigation } from "@react-navigation/native";

interface AppTabsProps {}

const Tab = createBottomTabNavigator<AppParamList>();

const AddPlacePlaceholder = () => null;

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
    // way to hide tabs on certain screens
    // tabBar={(props) => {
    //   return (
    //     <BottomTabBar {...props} state={{ ...props.state, routes: [props.state.routes[0]] }} />
    //   );
    // }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPlace"
        component={AddPlacePlaceholder}
        options={{
          title: "Add place",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddPlace");
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="message-square" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
