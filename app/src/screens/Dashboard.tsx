import React from "react";
import { View } from "react-native";
import { QueueBtn } from "../components/buttons/QueueBtn";
import { PlacesFeed } from "../components/feed/PlacesFeed";
import { DashboardNavProps } from "../navigation/dashboardStack/DashboardParamList";
import { ViewStyles } from "../styles/view";

export const Dashboard: React.FC<DashboardNavProps<"Dashboard">> = ({ navigation }) => {
  const goToPlaceDetail = (id: string) => navigation.push("Place", { id });
  return (
    <View style={ViewStyles.background}>
      <PlacesFeed goToDetail={goToPlaceDetail} />
      <QueueBtn />
    </View>
  );
};
