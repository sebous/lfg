import React from "react";
import { Text } from "react-native";
import { CenterView } from "../components/views/CenterView";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  return (
    <CenterView>
      <Text>Dashboard</Text>
    </CenterView>
  );
};
