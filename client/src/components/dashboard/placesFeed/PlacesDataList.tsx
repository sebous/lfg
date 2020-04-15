import React, { useEffect } from "react";
import _ from "lodash";
import { Container, Grid } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { PlaceItem } from "./PlaceItem";
import { GetPlaces, PlacesSubs_placesSubscription } from "../../../common/graphqlTypes";

const GET_PLACES = gql`
  query GetPlaces {
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
  subscription PlacesSubs {
    placesSubscription {
      id
      name
      joinedUsersIds
      createdBy {
        id
      }
    }
  }
`;

export const PlacesDataList: React.FC = () => {
  // load data
  const { loading, data, error, subscribeToMore } = useQuery<GetPlaces>(GET_PLACES);

  // placeholder message to render
  let message = "";
  if (loading) message = "loading...";
  else if (error) message = "error";
  else if (data?.getPlaces.length === 0) message = "no results";

  // component did mount hook
  // TODO: handle both updates and new places
  useEffect(() => {
    subscribeToMore({
      document: PLACES_SUBSCRIPTION,
      updateQuery: (prevData, { subscriptionData }) => {
        console.log(prevData, subscriptionData);
        if (!subscriptionData.data) return prevData;

        // TODO: codegen is not generating subscription interfaces correctly for subscribeToMore
        const incomingData = (subscriptionData as any).data.placesSubscription as PlacesSubs_placesSubscription;

        let places = [...prevData.getPlaces];

        // is update
        if (places.some(place => place.id === incomingData.id)) {
          places = places.map(p =>
            p.id === incomingData.id ? { ...p, joinedUsersIds: incomingData.joinedUsersIds } : p
          );
        }

        // is new
        else {
          const { id, createdBy, joinedUsersIds, name } = incomingData;
          places.push({ id, createdBy, joinedUsersIds, name, __typename: "Place" });
        }

        return { getPlaces: places };
      },
    });
  }, [subscribeToMore]);

  const sortedData = _.orderBy(data?.getPlaces, p => p.joinedUsersIds.length, ["desc"]);

  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {message ||
          sortedData.map(({ name, joinedUsersIds, id }) => (
            <Grid.Column mobile={8} key={id}>
              <PlaceItem id={id} clickHandler={() => {}} name={name} joinedUsersIds={joinedUsersIds} />
            </Grid.Column>
          ))}
      </Grid>
    </Container>
  );
};
