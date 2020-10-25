import { useQuery } from "@apollo/client";
import React from "react";
import { ActivityIndicator, FlatList, ListRenderItem, View } from "react-native";
import { Image } from "react-native-elements";
import { GET_PLACES } from "../../gql/places.graphql";
import { GetPlaces, GetPlaces_getPlaces } from "../../graphqlTypes";
import { SERVER_URL } from "../../lib/apolloClient";
import { AppColors } from "../../styles/colors";
import { FeedStyles } from "../../styles/feed";
import { PeopleInQueue } from "../peopleInQueue/PeopleInQueue";
import { TextError, TextH2, TextP } from "../text/Text";
import { Tile } from "../views/Tile";

interface PlacesFeedProps {
  goToDetail: (id: string) => void;
}

export const PlacesFeed: React.FC<PlacesFeedProps> = ({ goToDetail }) => {
  const { data, loading, error } = useQuery<GetPlaces>(GET_PLACES);
  console.log(data?.getPlaces);

  let InfoTile = () => <View />;
  if (loading) {
    InfoTile = () => (
      <Tile>
        <ActivityIndicator size="large" color={AppColors.GREEN} />
      </Tile>
    );
  }
  if (error) {
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

  const renderItem: ListRenderItem<GetPlaces_getPlaces> = ({
    item: { id, description, name, owner, image },
  }) => (
    <Tile>
      <View style={FeedStyles.feedTileContainer}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: owner.avatar! }} style={FeedStyles.userAvatar} />
        </View>
        <View style={{ flex: 4 }}>
          <TextH2>{name}</TextH2>
          <TextP>{description}</TextP>
        </View>
      </View>
      <Image
        source={{ uri: `http://${SERVER_URL}${image}` }}
        style={FeedStyles.feedTileImage}
        PlaceholderContent={<ActivityIndicator />}
      />
    </Tile>
  );

  return (
    <View style={{ flex: 1 }}>
      {data?.getPlaces && (
        <FlatList
          data={data?.getPlaces}
          renderItem={renderItem}
          keyExtractor={(p) => p.id}
          nestedScrollEnabled={true}
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
