import React from "react";
import { useQuery } from "@apollo/client";
import { View, StyleSheet } from "react-native";
import { GET_PEOPLE_IN_QUEUE } from "../../gql/peopleQueue.graphql";
import { GetPeopleInQueue } from "../../graphqlTypes";
import { usePeopleQueueSubscription } from "../../hooks/usePeopleQueueSubscription";
import { AppColors } from "../../styles/colors";
import { Tile } from "../views/Tile";
import { TextH2 } from "../text/Text";

interface PeopleInQueueProps {}

export const PeopleInQueue: React.FC<PeopleInQueueProps> = ({}) => {
  const { data, error, loading } = useQuery<GetPeopleInQueue>(GET_PEOPLE_IN_QUEUE);
  usePeopleQueueSubscription(data);

  if (loading) {
    return (
      <Tile>
        <TextH2>loading people in queue...</TextH2>
      </Tile>
    );
  }
  if (error) {
    console.log(error);
    return (
      <Tile>
        <TextH2>error</TextH2>
      </Tile>
    );
  }

  return (
    <Tile>
      <TextH2>People in queue: {data?.getPeopleInQueue.length}</TextH2>
    </Tile>
  );
};
