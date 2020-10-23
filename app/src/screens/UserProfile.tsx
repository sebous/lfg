import React from "react";
import { Text } from "react-native";
import { CenterView } from "../components/views/CenterView";

interface UserProfileProps {}

export const UserProfile: React.FC<UserProfileProps> = ({}) => {
  return (
    <CenterView>
      <Text>User profile</Text>
    </CenterView>
  );
};
