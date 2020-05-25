import { useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/react-hooks";
import { Action } from "../common/types";
import { PLACES_SUBSCRIPTION, GET_PLACES } from "../gql/places.graphql";
import { GetPlaces, PlacesSubs, GetPlaces_getPlaces } from "../common/graphqlTypes";

export const usePlacesSubscription = (data: GetPlaces | undefined) => {
  const client = useApolloClient();
  const { data: notification } = useSubscription<PlacesSubs>(PLACES_SUBSCRIPTION);

  useEffect(() => {
    if (!notification) return;
    const { action, data: notificationData } = notification.placesSubscription;

    const localData = data?.getPlaces ?? [];
    const query = GET_PLACES;

    if (action === Action.ADD) {
      const newPlace: GetPlaces_getPlaces = {
        ...notificationData,
        __typename: "Place",
      };

      client.writeQuery<GetPlaces>({
        query,
        data: {
          getPlaces: [...localData, newPlace],
        },
      });
    }

    if (action === Action.UPDATE) {
      const placeToUpdate = localData.find(p => p.id === notificationData.id);
      if (!placeToUpdate) return;

      client.writeQuery<GetPlaces>({
        query,
        data: {
          getPlaces: localData.map(p =>
            p.id === notificationData.id ? { ...notificationData, __typename: "Place" } : p
          ),
        },
      });
    }

    if (action === Action.DELETE) {
      console.log("delete action");
      const placeToDelete = localData.find(p => p.id === notificationData.id);
      if (!placeToDelete) return;

      client.writeQuery<GetPlaces>({
        query,
        data: {
          getPlaces: localData.filter(p => p.id !== placeToDelete.id),
        },
      });
    }
  }, [notification, client, data]);
};
