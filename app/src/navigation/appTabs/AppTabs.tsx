import React from "react";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AppParamList } from "./AppParamList";
import { DashboardStack } from "../dashboardStack/DashboardStack";
import { ChatStack } from "../chatStack/ChatStack";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "../../styles/colors";
import { SafeAreaView } from "react-native";

interface AppTabsProps {}

const Tab = createBottomTabNavigator<AppParamList>();

const AddPlacePlaceholder = () => null;

const ICON_SIZE = 26;

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

      tabBarOptions={{
        inactiveBackgroundColor: AppColors.DARK_MENU,
        activeBackgroundColor: AppColors.DARK_MENU,
        activeTintColor: AppColors.GREEN,
        style: {
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowRadius: 5,
          shadowOpacity: 0.5,
          shadowOffset: { height: 5, width: 0 },
          elevation: 10,
          height: 60,
          backgroundColor: AppColors.DARK_MENU,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={ICON_SIZE} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="AddPlace"
        component={AddPlacePlaceholder}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={ICON_SIZE} color={color} />
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
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="message-square" size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
