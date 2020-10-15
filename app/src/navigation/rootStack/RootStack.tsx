import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AddPlaceModal } from "../../components/AddPlaceModal";
import { AppTabs } from "../appTabs/AppTabs";

interface RootStackProps {}

const RootStackScreen = createStackNavigator();

export const RootStack: React.FC<RootStackProps> = ({}) => {
  return (
    <RootStackScreen.Navigator mode="modal">
      <RootStackScreen.Screen
        name="Dashboard"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <RootStackScreen.Screen
        name="AddPlace"
        component={AddPlaceModal}
        options={{
          animationEnabled: true,
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          // fade animation
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
      />
    </RootStackScreen.Navigator>
  );
};
