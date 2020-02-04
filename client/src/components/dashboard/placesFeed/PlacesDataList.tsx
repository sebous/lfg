import React from "react";
import _ from "lodash";
import { Container, Grid } from "semantic-ui-react";
import { PlaceItem } from "./PlaceItem";
import { useGlobalState } from "../../../common/state";
import { Place } from "../../../common/types";
import { placeFactory } from "../../../common/factories";

// for development purposes only
const dummyData: Place[] = _.range(12).map(() => placeFactory("Music Lab"));

export const PlacesDataList: React.FC = () => {
  const [places, updatePlaces] = useGlobalState("activePlaces");
  const [user] = useGlobalState("user");
  const dataset = places.length > 0 ? places : dummyData;

  const placeClickHandler = (id: string) => {
    const placeClicked = dataset.find(place => place.id === id);
    if (!placeClicked) return;

    const hasUserSelected = placeClicked.peopleJoined.includes(user!.userId);

    updatePlaces(places =>
      places.map(p => {
        if (p.id === placeClicked.id) {
          if (hasUserSelected) {
            return {
              ...placeClicked,
              peopleJoined: placeClicked.peopleJoined.filter(
                userId => userId !== user!.userId
              )
            };
          } else {
            return {
              ...placeClicked,
              peopleJoined: [...placeClicked.peopleJoined, user!.userId]
            };
          }
        }
        return p;
      })
    );
  };

  console.log(places, "datalist");
  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {dataset.map(({ name, peopleJoined, id }, i) => (
          <Grid.Column mobile={8} key={i}>
            <PlaceItem
              id={id}
              clickHandler={() => placeClickHandler(id)}
              name={name}
              peopleCount={peopleJoined.length}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};
