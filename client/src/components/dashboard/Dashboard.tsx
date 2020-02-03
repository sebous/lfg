import React from "react";
import { PeopleInQueue } from "./PeopleInQueue";
import { Divider } from "semantic-ui-react";
import { PlacesDataList } from "./PlacesDataList";
import { DashboardBottomBar } from "./bottomBar/DashboardBottomBar";

export const Dashbaord: React.FC = () => {
  return (
    <div style={{ height: "calc(100vh - 40px)" }}>
      <div style={{ height: "18%", borderBottom: "1px solid" }}>
        <PeopleInQueue />
      </div>

      <div style={{ height: "82%", overflow: "auto", padding: "1em 0 4em" }}>
        <PlacesDataList />
      </div>
      <div style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <DashboardBottomBar />
      </div>
    </div>
  );
};
