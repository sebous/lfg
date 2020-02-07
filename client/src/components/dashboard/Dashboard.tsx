import React from "react";
import { PeopleInQueue } from "./PeopleInQueue";
import { PlacesDataList } from "./placesFeed/PlacesDataList";
import { DashboardBottomBar } from "./bottomBar/DashboardBottomBar";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const Dashbaord: React.FC = () => {
  // const { loading, data, error } = useQuery(EXCHANGE_RATES);
  // if (loading) return <p>loading</p>;
  // if (error) return <p>error</p>;
  // if (data) console.log(data);

  return (
    <div style={{ height: "calc(100vh - 40px)", overflow: "hidden" }}>
      <div style={{ borderBottom: "1px solid" }}>
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
