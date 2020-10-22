import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { GET_PEOPLE_IN_QUEUE, PEOPLE_QUEUE_SUBS } from "../gql/peopleQueue.graphql";
import {
  GetPeopleInQueue,
  peopleQueueSubscription,
  peopleQueueSubscription_peopleQueueSubscription_data,
} from "../graphqlTypes";
import { Action } from "../types";

export function usePeopleQueueSubscription(data?: GetPeopleInQueue) {
  const client = useApolloClient();
  const { data: notification, error: subsErr } = useSubscription<peopleQueueSubscription>(
    PEOPLE_QUEUE_SUBS,
  );

  useEffect(() => {
    if (!notification) return;
    const { action, data: notificationData } = notification.peopleQueueSubscription;

    const localData = data?.getPeopleInQueue ?? [];
    const query = GET_PEOPLE_IN_QUEUE;

    console.log(action, notificationData, data);

    if (action === Action.ADD) {
      const newUser: peopleQueueSubscription_peopleQueueSubscription_data = {
        ...notificationData,
        __typename: "User",
      };

      client.writeQuery<GetPeopleInQueue>({
        query,
        data: { getPeopleInQueue: [...localData, newUser] },
      });
    }

    if (action === Action.DELETE) {
      client.writeQuery<GetPeopleInQueue>({
        query,
        data: {
          getPeopleInQueue: localData.filter((u) => u.id !== notificationData.id),
        },
      });
    }
  }, [notification, client]);
}
