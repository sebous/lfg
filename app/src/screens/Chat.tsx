import React from "react";
import { Text } from "react-native";
import { CenterView } from "../components/views/CenterView";

interface ChatProps {}

export const Chat: React.FC<ChatProps> = ({}) => {
  return (
    <CenterView>
      <Text>Chat</Text>
    </CenterView>
  );
};
