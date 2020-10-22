import React from "react";
import { Text, View } from "react-native";
import { ViewStyles } from "../styles/view";

interface ChatProps {}

export const Chat: React.FC<ChatProps> = ({}) => {
  return (
    <View style={ViewStyles.background}>
      <Text>Chat</Text>
    </View>
  );
};
