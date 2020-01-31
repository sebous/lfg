import React from "react";
import { PeopleInQueue } from "./PeopleInQueue";
import { Divider } from "semantic-ui-react";
import { PlacesDataList } from "./PlacesDataList";
import { DashboardBottomBar } from "./DashboardBottomBar";

export const Dashbaord: React.FC = () => {
  return (
    <div style={{ height: "calc(100vh - 36px)" }}>
      <div style={{ height: "16%", borderBottom: "1px solid" }}>
        <PeopleInQueue />
      </div>

      <div style={{ height: "68%", overflow: "auto", padding: "1em 0 2em" }}>
        <PlacesDataList />
      </div>
      <div style={{ height: "16%" }}>
        <DashboardBottomBar />
      </div>
    </div>
  );
};
