import React from "react";
import _ from "lodash";
import { Container, Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { PlaceItem } from "./PlaceItem";
import { GetPlaces } from "../../../common/graphqlTypes";
import { usePlacesSubscription } from "../../../hooks/usePlacesSubscription";
import { GET_PLACES } from "../../../gql/places.graphql";

export const PlacesDataList: React.FC = () => {
  // load data
  const { loading, data, error } = useQuery<GetPlaces>(GET_PLACES);

  // placeholder message to render
  let message = "";
  if (loading) message = "loading...";
  else if (error) message = "error";
  else if (data?.getPlaces.length === 0) message = "no results";

  usePlacesSubscription(data);

  // const sortedData = data;
  const sortedData = _.orderBy(data?.getPlaces, p => p.joinedUsers?.length ?? 0, ["desc"]);

  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {message ||
          (sortedData &&
            sortedData.map(({ name, joinedUsers, id, owner }) => (
              <Grid.Column mobile={8} key={id}>
                <PlaceItem id={id} name={name} joinedUsers={joinedUsers ?? []} ownerId={owner.id} />
              </Grid.Column>
            )))}
      </Grid>
    </Container>
  );
};
