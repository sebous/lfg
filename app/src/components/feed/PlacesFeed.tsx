import { useApolloClient, useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { GET_PLACES } from "../../gql/places.graphql";
import { GetPlaces, GetPlaces_getPlaces } from "../../graphqlTypes";
import { AppColors } from "../../styles/colors";
import { PeopleInQueue } from "../peopleInQueue/PeopleInQueue";
import { TextError, TextH2, TextP } from "../text/Text";
import { Tile } from "../views/Tile";
import { PlaceFeedItem } from "./PlaceFeedItem";

interface PlacesFeedProps {
  goToDetail: (id: string) => void;
}

export const PlacesFeed: React.FC<PlacesFeedProps> = ({ goToDetail }) => {
  const { data, loading, error } = useQuery<GetPlaces>(GET_PLACES, { pollInterval: 10000 });

  let InfoTile = () => <View />;
  if (loading) {
    InfoTile = () => (
      <Tile>
        <ActivityIndicator size="large" color={AppColors.GREEN} />
      </Tile>
    );
  }
  if (error && (!data?.getPlaces || data.getPlaces.length === 0)) {
    InfoTile = () => (
      <Tile>
        <TextError>error loading places</TextError>
      </Tile>
    );
  }
  if (data?.getPlaces.length === 0) {
    InfoTile = () => (
      <Tile>
        <TextP>No places, wanna add some?</TextP>
      </Tile>
    );
  }

  const sortedData = [...(data?.getPlaces ?? [])].sort(
    (a, b) => b.joinedUsers!.length - a.joinedUsers!.length,
  );

  return (
    <View style={{ flex: 1 }}>
      {data?.getPlaces && (
        <FlatList
          data={sortedData}
          renderItem={(props) => <PlaceFeedItem {...props} />}
          keyExtractor={(p) => p.id}
          ListHeaderComponent={
            <>
              <PeopleInQueue />
              <InfoTile />
            </>
          }
        />
      )}
    </View>
  );
};
