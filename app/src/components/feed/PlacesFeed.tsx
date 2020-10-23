import { useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, ListRenderItem, View } from "react-native";
import { GET_PLACES } from "../../gql/places.graphql";
import { GetPlaces, GetPlaces_getPlaces } from "../../graphqlTypes";
import { AppColors } from "../../styles/colors";
import { TextError, TextH2, TextP } from "../text/Text";
import { Tile } from "../views/Tile";

interface PlacesFeedProps {
  goToDetail: (id: string) => void;
}

export const PlacesFeed: React.FC<PlacesFeedProps> = ({ goToDetail }) => {
  const { data, loading, error } = useQuery<GetPlaces>(GET_PLACES);

  const renderItem: ListRenderItem<GetPlaces_getPlaces> = ({
    item: { id, description, name, owner },
  }) => (
    <Tile>
      <TextH2>{name}</TextH2>
      <TextP>{description}</TextP>
    </Tile>
  );
  return (
    <View>
      {loading && (
        <Tile>
          <ActivityIndicator size="large" color={AppColors.GREEN} />
        </Tile>
      )}
      {error && (
        <Tile>
          <TextError>error loading places</TextError>
        </Tile>
      )}
      {data?.getPlaces?.length === 0 && (
        <Tile>
          <TextP>No places, wanna add some?</TextP>
        </Tile>
      )}
      {data?.getPlaces && (
        <FlatList
          data={data?.getPlaces}
          renderItem={renderItem}
          keyExtractor={(p) => p.id}
          nestedScrollEnabled
        />
      )}
    </View>
  );
};
