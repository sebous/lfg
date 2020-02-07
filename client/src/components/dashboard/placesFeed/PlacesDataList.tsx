import React from "react";
import _ from "lodash";
import { Container, Grid } from "semantic-ui-react";
import { PlaceItem } from "./PlaceItem";
import { useGlobalState } from "../../../common/state";
import { Place } from "../../../common/types";
import { placeFactory } from "../../../common/factories";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

// for development purposes only
const dummyData: Place[] = _.range(12).map(() => placeFactory("Music Lab"));

const GET_PLACES = gql`
  query {
    getPlaces {
      id
      name
      joinedUsersIds
      # createdBy {
      #   id
      # }
    }
  }
`;

interface GetPlacesResult {
  getPlaces: Place[];
}

export const PlacesDataList: React.FC = () => {
  const [places, updatePlaces] = useGlobalState("activePlaces");
  const [user] = useGlobalState("user");

  let message = undefined;
  const { loading, data, error, subscribeToMore } = useQuery<GetPlacesResult>(
    GET_PLACES
  );
  console.log(loading, data, error);
  if (loading) message = "loading...";
  else if (error) message = "error";
  else if (data?.getPlaces.length === 0) message = "no results";

  // subscribeToMore({
  //   document:
  // })

  const dataset = places.length > 0 ? places : dummyData;

  // const placeClickHandler = (id: string) => {
  //   const placeClicked = dataset.find(place => place.id === id);
  //   if (!placeClicked) return;

  //   const hasUserSelected = placeClicked.joinedUsersIds.includes(user!.userId);

  //   updatePlaces(places =>
  //     places.map(p => {
  //       if (p.id === placeClicked.id) {
  //         if (hasUserSelected) {
  //           return {
  //             ...placeClicked,
  //             joinedUsersIds: placeClicked.joinedUsersIds.filter(
  //               userId => userId !== user!.userId
  //             ),
  //           };
  //         } else {
  //           return {
  //             ...placeClicked,
  //             joinedUsersIds: [...placeClicked.joinedUsersIds, user!.userId],
  //           };
  //         }
  //       }
  //       return p;
  //     })
  //   );
  // };

  console.log(places, "datalist");
  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {message ||
          data?.getPlaces.map(({ name, joinedUsersIds, id }, i) => (
            <Grid.Column mobile={8} key={i}>
              <PlaceItem
                id={id}
                clickHandler={() => {}}
                name={name}
                peopleCount={joinedUsersIds.length}
              />
            </Grid.Column>
          ))}
      </Grid>
    </Container>
  );
};
