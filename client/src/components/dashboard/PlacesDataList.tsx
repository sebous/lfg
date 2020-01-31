import React from "react";
import _ from "lodash";
import { Container, Grid } from "semantic-ui-react";
import { PlaceItem } from "./PlaceItem";

// const places;

export const PlacesDataList: React.FC = () => {
  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {_.range(8).map(i => (
          <Grid.Column mobile={8} key={i}>
            <PlaceItem
              id="asdas"
              clickHandler={() => console.log("asdas clicked")}
              name="Music lab"
              peopleCount={6}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};
