import React from "react";
import { Text } from "react-native";
import { CenterView } from "../components/views/CenterView";
interface PlaceProps {}

export const Place: React.FC<PlaceProps> = ({}) => {
  return (
    <CenterView>
      <Text>Place detail</Text>
    </CenterView>
  );
};
