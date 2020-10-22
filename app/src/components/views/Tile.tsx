import React from "react";
import { View } from "react-native";
import { ViewStyles } from "../../styles/view";

export const Tile: React.FC = ({ children }) => {
  return (
    <View style={ViewStyles.tileWrapper}>
      <View style={ViewStyles.tile}>{children}</View>
    </View>
  );
};
