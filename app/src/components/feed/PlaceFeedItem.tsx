import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { ActivityIndicator, ListRenderItem, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import {
  GetPlaces_getPlaces,
  JoinPlace,
  JoinPlaceVariables,
  LeavePlace,
  LeavePlaceVariables,
} from "../../graphqlTypes";
import { SERVER_URL } from "../../lib/apolloClient";
import { AppColors } from "../../styles/colors";
import { FeedStyles } from "../../styles/feed";
import { BtnIcon } from "../buttons/Btn";
import { JoinedUsers } from "../info/JoinedUsers";
import { TextH2, TextP } from "../text/Text";
import { Tile } from "../views/Tile";
import { GET_PLACES, JOIN_PLACE, LEAVE_PLACE } from "../../gql/places.graphql";
import { ACCESS_TOKEN } from "../../hooks/useLogin";
import { userInfoVar } from "../../lib/apolloCache";

export const PlaceFeedItem: ListRenderItem<GetPlaces_getPlaces> = ({
  item: { id, description, name, owner, image, joinedUsers },
}) => {
  const userInfo = useReactiveVar(userInfoVar);
  const [joinPlace, { data: joinPlaceResult, error: joinPlaceError }] = useMutation<
    JoinPlace,
    JoinPlaceVariables
  >(JOIN_PLACE);
  const [leavePlace, { data: leavePlaceResult, error: leavePlaceError }] = useMutation<
    LeavePlace,
    LeavePlaceVariables
  >(LEAVE_PLACE);

  const hasUserJoined = useMemo(() => !!joinedUsers?.find((u) => u.id === userInfo!.id), [
    joinedUsers,
  ]);

  // TODO: token should be fetched from state
  const [token, setToken] = useState<string>();
  useEffect(() => {
    async function getToken() {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      if (accessToken) setToken(accessToken);
    }
    getToken();
  }, [userInfo]);

  const joinBtnClick = () => {
    if (!hasUserJoined) {
      joinPlace({ variables: { placeId: id }, refetchQueries: [{ query: GET_PLACES }] });
    } else {
      leavePlace({ variables: { placeId: id }, refetchQueries: [{ query: GET_PLACES }] });
    }
  };

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
          {token && (
            <Image
              source={{ uri: `http://${SERVER_URL}${image}?authorization=${token}` }}
              style={FeedStyles.feedTileImage}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <JoinedUsers count={joinedUsers?.length ?? 0} />
          <View style={{ paddingLeft: 20, marginTop: 20 }}>
            <BtnIcon
              icon={<AntDesign name="arrowright" color={AppColors.WHITE} size={20} />}
              onPress={joinBtnClick}
              background="transparent"
              color={AppColors.WHITE}
              align="flex-start"
            >
              {!hasUserJoined ? "JOIN" : "LEAVE"}
            </BtnIcon>
          </View>
        </View>
      </View>
    </Tile>
  );
};
