import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PeopleInQueue } from "../components/peopleInQueue/PeopleInQueue";
import { CenterView } from "../components/views/CenterView";
import { DashboardNavProps } from "../navigation/dashboardStack/DashboardParamList";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardNavProps<"Dashboard">> = ({}) => {
  return (
    <View style={styles.dashboard}>
      <PeopleInQueue />
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: { paddingHorizontal: 5, flex: 1, flexDirection: "column" },
});
