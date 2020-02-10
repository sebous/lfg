import React, { useEffect } from "react";
import _ from "lodash";
import { Container, Grid } from "semantic-ui-react";
import { PlaceItem } from "./PlaceItem";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  PlacesQuery,
  PlacesSubscription_placesSubscription,
} from "../../../common/graphqlTypes";

const GET_PLACES = gql`
  query PlacesQuery {
    getPlaces {
      id
      name
      joinedUsersIds
      createdBy {
        id
      }
    }
  }
`;

const PLACES_SUBSCRIPTION = gql`
  subscription PlacesSubscription {
    placesSubscription {
      id
      date
      data {
        id
        name
        joinedUsersIds
        createdBy {
          id
        }
      }
    }
  }
`;

export const PlacesDataList: React.FC = () => {
  let message = undefined;
  const { loading, data, error, subscribeToMore } = useQuery<PlacesQuery>(
    GET_PLACES
  );
  console.log(loading, data, error);
  if (loading) message = "loading...";
  else if (error) message = "error";
  else if (data?.getPlaces.length === 0) message = "no results";

  // component did mount hook
  useEffect(() => {
    subscribeToMore({
      document: PLACES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);
        if (!subscriptionData.data) return prev;

        const placeNotification = (subscriptionData.data as any)
          .placesSubscription as PlacesSubscription_placesSubscription;

        let places = [...prev.getPlaces];
        // is update
        if (prev.getPlaces.some(place => place.id === placeNotification.id)) {
          places = places.map(p =>
            p.id === placeNotification.data.id
              ? { ...p, joinedUsersIds: placeNotification.data.joinedUsersIds }
              : p
          );
        }
        // is new
        else {
          const {
            id,
            createdBy,
            name,
            joinedUsersIds,
          } = placeNotification.data;
          places.push({
            id,
            createdBy,
            name,
            joinedUsersIds,
            __typename: "Place",
          });
        }

        const sortedPlaces = _.sortBy(
          places,
          place => place.joinedUsersIds.length,
          ["desc"]
        );
        console.log(sortedPlaces);

        return {
          ...prev,
          getPlaces: sortedPlaces,
        };
      },
    });
  }, []);

  const sortedData = _.orderBy(data?.getPlaces, p => p.joinedUsersIds.length, [
    "desc",
  ]);

  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {message ||
          sortedData.map(({ name, joinedUsersIds, id }, i) => (
            <Grid.Column mobile={8} key={id}>
              <PlaceItem
                id={id}
                clickHandler={() => {}}
                name={name}
                joinedUsersIds={joinedUsersIds}
              />
            </Grid.Column>
          ))}
      </Grid>
    </Container>
  );
};
