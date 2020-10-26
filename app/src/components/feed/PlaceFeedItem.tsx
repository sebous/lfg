import React from "react";
import { ActivityIndicator, ListRenderItem, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native-elements";
import { GetPlaces_getPlaces } from "../../graphqlTypes";
import { SERVER_URL } from "../../lib/apolloClient";
import { AppColors } from "../../styles/colors";
import { FeedStyles } from "../../styles/feed";
import { BtnIcon } from "../buttons/Btn";
import { JoinedUsers } from "../info/JoinedUsers";
import { TextH2, TextP } from "../text/Text";
import { Tile } from "../views/Tile";

export const PlaceFeedItem: ListRenderItem<GetPlaces_getPlaces> = ({
  item: { id, description, name, owner, image, joinedUsers },
}) => {
  return (
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
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: `http://${SERVER_URL}${image}` }}
            style={FeedStyles.feedTileImage}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={{ flex: 1 }}>
          <JoinedUsers count={joinedUsers?.length ?? 0} />
          <View style={{ paddingLeft: 20, marginTop: 20 }}>
            <BtnIcon
              icon={<AntDesign name="arrowright" color={AppColors.WHITE} size={20} />}
              onPress={() => {}}
              background="transparent"
              color={AppColors.WHITE}
              align="flex-start"
            >
              JOIN
            </BtnIcon>
          </View>
        </View>
      </View>
    </Tile>
  );
};
