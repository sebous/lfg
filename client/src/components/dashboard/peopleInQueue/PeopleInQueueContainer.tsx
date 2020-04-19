import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PEOPLE_IN_QUEUE } from "../../../gql/peopleQueue.graphql";
import { GetPeopleInQueue } from "../../../common/graphqlTypes";
import { PeopleInQueue } from "./PeopleInQueue";
import { usePeopleQueueSubscription } from "../../../hooks/usePeopleQueueSubscription";

export const PeopleInQueueContainer: React.FC = () => {
  const { error, loading, data } = useQuery<GetPeopleInQueue>(GET_PEOPLE_IN_QUEUE);
  console.log(data);

  usePeopleQueueSubscription(data);

  return !error && !loading && data ? <PeopleInQueue people={data?.getPeopleInQueue} /> : <div />;
};
