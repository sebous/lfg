import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatParamList } from "./ChatParamList";
import { Chat } from "../../screens/Chat";
import { UserProfile } from "../../screens/UserProfile";

interface ChatStackProps {}

const Stack = createStackNavigator<ChatParamList>();

export const ChatStack: React.FC<ChatStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};
