import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AppColors } from "../../styles/colors";
import { FeedStyles } from "../../styles/feed";

interface JoinedUsersProps {
  count: number;
}

export const JoinedUsers: React.FC<JoinedUsersProps> = ({ count }) => {
  return (
    <View style={FeedStyles.joinedUsersWrapper}>
      <Feather name="users" color={AppColors.TEXT_LIGHT} size={26} />
      <Text style={FeedStyles.joinedUsersText}>{count}</Text>
    </View>
  );
};
