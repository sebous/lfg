import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import faker from "faker";
import { GET_PEOPLE_IN_QUEUE, PEOPLE_QUEUE_SUBS } from "../../gql/peopleQueue.graphql";
import { GetPeopleInQueue, peopleQueueSubscription } from "../../graphqlTypes";

interface PeopleInQueueProps {}

export const PeopleInQueue: React.FC<PeopleInQueueProps> = ({}) => {
  const client = useApolloClient();
  const { data, error, loading } = useQuery<GetPeopleInQueue>(GET_PEOPLE_IN_QUEUE);
  // const {data: notification} = useSubscription<peopleQueueSubscription>(PEOPLE_QUEUE_SUBS);

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
  if (error) {
    console.log(error);
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }
  console.log("getPeopleInQueue", data);

  if (data?.getPeopleInQueue.length === 0) {
    return (
      <View>
        {[...Array(4).keys()]
          .map(() => ({ username: faker.name.firstName() }))
          .map((user, i) => (
            <Text key={i}>{user.username}</Text>
          ))}
      </View>
    );
  }

  return (
    <View>
      {data?.getPeopleInQueue.map((person) => (
        <Text>{person.username}</Text>
      ))}
    </View>
  );
};
