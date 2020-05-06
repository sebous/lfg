import { useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/react-hooks";
import { Action } from "../common/types";
import { GET_PEOPLE_IN_QUEUE, PEOPLE_QUEUE_SUBS } from "../gql/peopleQueue.graphql";
import { GetPeopleInQueue, GetPeopleInQueue_getPeopleInQueue, peopleQueueSubscription } from "../common/graphqlTypes";

export const usePeopleQueueSubscription = (data: GetPeopleInQueue | undefined) => {
  const client = useApolloClient();
  const { data: notification } = useSubscription<peopleQueueSubscription>(PEOPLE_QUEUE_SUBS);

  useEffect(() => {
    if (!notification) return;
    const { action, data: notificationData } = notification.peopleQueueSubscription;

    const localData = data?.getPeopleInQueue ?? [];
    const query = GET_PEOPLE_IN_QUEUE;

    if (action === Action.ADD) {
      const newPerson: GetPeopleInQueue_getPeopleInQueue = {
        ...notificationData,
        __typename: "User",
      };

      client.writeQuery<GetPeopleInQueue>({
        query,
        data: {
          getPeopleInQueue: [...localData, newPerson],
        },
      });
    }

    if (action === Action.UPDATE) {
      const personToUpdate = localData.find(p => p.id === notificationData.id);
      if (!personToUpdate) return;

      client.writeQuery<GetPeopleInQueue>({
        query,
        data: {
          getPeopleInQueue: localData.map(p =>
            p.id === notificationData.id ? { ...notificationData, __typename: "User" } : p
          ),
        },
      });
    }

    if (action === Action.DELETE) {
      const personToDelete = localData.find(p => p.id === notificationData.id);
      if (!personToDelete) return;

      client.writeQuery<GetPeopleInQueue>({
        query,
        data: {
          getPeopleInQueue: localData.filter(p => p.id !== personToDelete.id),
        },
      });
    }
  }, [notification, client, data]);
};
