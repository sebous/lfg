import { gql } from "apollo-boost";

export const GET_PEOPLE_IN_QUEUE = gql`
  query GetPeopleInQueue {
    getPeopleInQueue {
      id
      username
    }
  }
`;

export const PEOPLE_QUEUE_SUBS = gql`
  subscription peopleQueueSubscription {
    peopleQueueSubscription {
      id
      date
      action
      data {
        id
        username
      }
    }
  }
`;
