import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useQuery } from "@apollo/react-hooks";
import { GetPeopleInQueue } from "../../../common/graphqlTypes";
import { dummyPeopleInQueue } from "../../../common/dummyData";
import { UserIconSlider } from "../../ui/UserIconSlider";
import { GET_PEOPLE_IN_QUEUE } from "../../../gql/peopleQueue.graphql";
import { usePeopleQueueSubscription } from "../../../hooks/usePeopleQueueSubscription";

const dummyPeopleEnabled = process.env.NODE_ENV === "development" && process.env.REACT_APP_DUMMY_USERS === "true";
const dummyPeople = dummyPeopleInQueue(12);

export const PeopleInQueue: React.FC = () => {
  // initial query
  const { error, loading, data } = useQuery<GetPeopleInQueue>(GET_PEOPLE_IN_QUEUE);

  // subscribe to updates
  usePeopleQueueSubscription(data);

  // use dummyPeople if needed
  const peopleData = data?.getPeopleInQueue || dummyPeopleEnabled ? dummyPeople : data?.getPeopleInQueue;

  return !error && !loading && peopleData ? <UserIconSlider people={peopleData} /> : <div />;
};
