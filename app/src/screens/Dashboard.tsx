import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { QueueBtn } from "../components/buttons/QueueBtn";
import { PlacesFeed } from "../components/feed/PlacesFeed";
import { PeopleInQueue } from "../components/peopleInQueue/PeopleInQueue";
import { CenterView } from "../components/views/CenterView";
import { DashboardNavProps } from "../navigation/dashboardStack/DashboardParamList";
import { ViewStyles } from "../styles/view";

export const Dashboard: React.FC<DashboardNavProps<"Dashboard">> = ({ navigation }) => {
  const goToPlaceDetail = (id: string) => navigation.push("Place", { id });
  return (
    <View style={ViewStyles.background}>
      <ScrollView>
        <PeopleInQueue />
        <PlacesFeed goToDetail={goToPlaceDetail} />
      </ScrollView>
      <QueueBtn />
    </View>
  );
};
