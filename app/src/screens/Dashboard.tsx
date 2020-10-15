import React from "react";
import { Text, View } from "react-native";
import { PeopleInQueue } from "../components/peopleInQueue/PeopleInQueue";
import { CenterView } from "../components/views/CenterView";
import { DashboardNavProps } from "../navigation/dashboardStack/DashboardParamList";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardNavProps<"Dashboard">> = ({}) => {
  return (
    <View>
      <PeopleInQueue />
    </View>
  );
};
