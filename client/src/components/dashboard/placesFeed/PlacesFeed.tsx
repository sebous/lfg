import React, { useRef } from "react";
import _ from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { GetPlaces, GetPlaces_getPlaces } from "../../../common/graphqlTypes";
import { GET_PLACES } from "../../../gql/places.graphql";
import { PlaceCardsContainer } from "../../ui/PlaceCard/style";
import { usePlacesSubscription } from "../../../hooks/usePlacesSubscription";
import { PlaceCard } from "../../ui/PlaceCard";
import { useGlobalState } from "../../../common/state";
import { PlaceSlider } from "../../ui/PlaceSlider";

export const PlacesFeed: React.FC = () => {
  const [currentUser] = useGlobalState("user");

  // load data
  const { loading, data, error } = useQuery<GetPlaces>(GET_PLACES);

  // TODO: add loading, handle error, handle no results

  // subscribe to updates
  usePlacesSubscription(data);

  // sort data
  // const sortedData = _.orderBy(data?.getPlaces, p => p.joinedUsers?.length ?? 0, ["desc"]);
  const sortedData: GetPlaces_getPlaces[] = _.range(4).map(n => ({
    id: String(n),
    name: "Music Lab",
    __typename: "Place",
    owner: { __typename: "User", id: "asdasd" },
    joinedUsers: [],
  }));

  return <PlaceSlider currentUserId={currentUser!.id} places={sortedData} />;
};
