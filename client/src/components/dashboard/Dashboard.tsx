import React from "react";
import { PeopleInQueue } from "./peopleInQueue/PeopleInQueue";
// import { PlaceCard } from "../ui/PlaceCard";
// import { dummyPeopleInQueue } from "../../common/dummyData";
// import { PlaceCardsContainer } from "../ui/PlaceCard/style";
import { PlacesFeed } from "./placesFeed/PlacesFeed";
import { ActionsBar } from "./actionsBar/ActionsBar";

export const Dashbaord: React.FC = () => {
  return (
    <div>
      <PeopleInQueue />
      <PlacesFeed />
      <ActionsBar />
    </div>
  );
};
