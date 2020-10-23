import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { QueueBtn } from "../components/buttons/QueueBtn";
import { PeopleInQueue } from "../components/peopleInQueue/PeopleInQueue";
import { CenterView } from "../components/views/CenterView";
import { DashboardNavProps } from "../navigation/dashboardStack/DashboardParamList";
import { ViewStyles } from "../styles/view";

export const Dashboard: React.FC<DashboardNavProps<"Dashboard">> = ({}) => {
  return (
    <View style={ViewStyles.background}>
      <ScrollView>
        <PeopleInQueue />
      </ScrollView>
      <QueueBtn />
    </View>
  );
};
