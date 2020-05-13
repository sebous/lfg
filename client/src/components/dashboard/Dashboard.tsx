import React from "react";
import { PeopleInQueue } from "./peopleInQueue/PeopleInQueue";
import { PlaceCard } from "../ui/PlaceCard";
import { dummyPeopleInQueue } from "../../common/dummyData";

export const Dashbaord: React.FC = () => {
  return (
    <div>
      <PeopleInQueue />
      <PlaceCard userQueue={dummyPeopleInQueue(6) as any} />
      {/* <div style={{ borderBottom: "1px solid" }}>
      </div>
      <div style={{ height: "82%", overflow: "auto", padding: "1em 0 4em" }}>
        <PlacesDataList />
      </div>
      <div style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <DashboardBottomBar />
      </div> */}
    </div>
  );
};
