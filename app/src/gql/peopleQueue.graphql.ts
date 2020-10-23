import { gql } from "@apollo/client";

// TODO: add avatar too
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

export const QUEUE_SELF = gql`
  mutation QueueSelf {
    queueSelf
  }
`;

export const LEAVE_QUEUE = gql`
  mutation LeaveQueue {
    leaveQueue
  }
`;
