import React from "react";
import { PeopleInQueue } from "./peopleInQueue/PeopleInQueue";
import { PlacesFeed } from "./placesFeed/PlacesFeed";
import { ActionsBar } from "./actionsBar/ActionsBar";
// import { Chat } from "./chat/Chat";
import { DashboardContainer } from "../ui/Container";

export const Dashbaord: React.FC = () => {
  return (
    <DashboardContainer>
      <PeopleInQueue />
      <PlacesFeed />
      {/* TODO: move chat to different screen */}
      {/* <Chat /> */}
      <ActionsBar />
    </DashboardContainer>
  );
};
