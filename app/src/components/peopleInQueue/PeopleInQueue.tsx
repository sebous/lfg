import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import faker from "faker";
import { GET_PEOPLE_IN_QUEUE, PEOPLE_QUEUE_SUBS } from "../../gql/peopleQueue.graphql";
import { GetPeopleInQueue, peopleQueueSubscription } from "../../graphqlTypes";
import { usePeopleQueueSubscription } from "../../hooks/usePeopleQueueSubscription";

interface PeopleInQueueProps {}

export const PeopleInQueue: React.FC<PeopleInQueueProps> = ({}) => {
  const client = useApolloClient();
  const { data, error, loading } = useQuery<GetPeopleInQueue>(GET_PEOPLE_IN_QUEUE);
  usePeopleQueueSubscription(data);
  // useEffect(() => {
  //   console.log("notification", notification);
  // }, [notification]);
  // useEffect(() => {
  //   console.log("subsErr", subsErr);
  // }, [subsErr]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>loading people in queue...</Text>
      </View>
    );
  }
  if (error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Text>error</Text>
      </View>
    );
  }
  console.log("getPeopleInQueue", data);

  return (
    <View style={styles.container}>
      <Text>People in queue: {data?.getPeopleInQueue.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "lightgreen",
  },
});
