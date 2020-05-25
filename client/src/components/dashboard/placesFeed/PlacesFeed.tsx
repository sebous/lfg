import React from "react";
import _ from "lodash";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GetPlaces, GetPlaces_getPlaces, JoinPlace, LeavePlace, RemovePlace } from "../../../common/graphqlTypes";
import { GET_PLACES, JOIN_PLACE, LEAVE_PLACE, REMOVE_PLACE } from "../../../gql/places.graphql";
import { usePlacesSubscription } from "../../../hooks/usePlacesSubscription";
import { useGlobalState } from "../../../common/state";
import { PlaceSlider } from "../../ui/PlaceSlider";

export const PlacesFeed: React.FC = () => {
  const [currentUser] = useGlobalState("user");
  if (!currentUser) throw Error("user not authenticated");

  // load data
  const { data } = useQuery<GetPlaces>(GET_PLACES);

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

  // join/leave place action
  const [joinPlace] = useMutation<JoinPlace>(JOIN_PLACE);
  const [leavePlace] = useMutation<LeavePlace>(LEAVE_PLACE);

  function joinOrLeave(placeId: string) {
    const place = sortedData.find(p => p.id === placeId);
    if (!place) return;

    // join
    if (!place.joinedUsers?.find(user => user.id === currentUser?.id)) {
      joinPlace({ variables: { placeId } });
    }
    // leave
    else {
      leavePlace({ variables: { placeId } });
    }
  }

  // remove place action
  const [removePlace] = useMutation<RemovePlace>(REMOVE_PLACE);

  function removePlaceFn(placeId: string) {
    const place = sortedData.find(p => p.id === placeId);
    if (!place) return;

    // user can delete only his own places
    // TODO: admin can delete others tho, maybe remove this in the future
    if (place.owner.id !== currentUser?.id) {
      // TODO: throw nice error here
      return;
    }

    removePlace({ variables: { placeId } });
  }

  return (
    <PlaceSlider
      currentUserId={currentUser.id}
      places={sortedData}
      onClickPlaceBtn={joinOrLeave}
      onPlaceCardHold={removePlaceFn}
    />
  );
};
