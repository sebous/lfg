import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { UpdatePlaceJoined } from "../../../common/graphqlTypes";
import { useGlobalState } from "../../../common/state";
import { useLongPress } from "../../../hooks/useLongPress";
import { REMOVE_PLACE, UPDATE_PLACE } from "../../../gql/places.graphql";

interface PlaceItemProps {
  id: string;
  name: string;
  joinedUsersIds: string[];
  createdByUserId: string;
}

export const PlaceItem: React.FC<PlaceItemProps> = ({ id, name, joinedUsersIds, createdByUserId }) => {
  const [user] = useGlobalState("user");
  if (!user) throw Error("user not authenticated");

  const [updatePlace] = useMutation<UpdatePlaceJoined>(UPDATE_PLACE);
  const [removePlace] = useMutation(REMOVE_PLACE);

  // checks place for current user (interested/not)
  const updateFn = () => {
    let users = [...joinedUsersIds];
    if (users.indexOf(user.id) > -1) {
      users = users.filter(u => u !== user.id);
    } else {
      users.push(user.id);
    }

    // this also updates local apollo cache
    updatePlace({
      variables: {
        placeInfo: {
          id,
          joinedUsersIds: users,
        },
      },
    });
  };

  // delete place
  // TODO: deletion should be in 2 steps, show delete btn and after click validate&delete
  const deleteFn = () => {
    console.log("here");
    // user can delete only his own places
    if (createdByUserId !== user.id) {
      // TODO: throw nice error here
      return;
    }

    removePlace({
      variables: { userId: user.id, placeId: id },
    });
  };

  const onHold = useLongPress(500, deleteFn);

  return (
    <div {...onHold}>
      <Card onClick={updateFn}>
        <Card.Content header={name} />
        <Card.Content extra>
          <Icon name="user" />
          {joinedUsersIds.length} boys would smash this
        </Card.Content>
      </Card>
    </div>
  );
};
