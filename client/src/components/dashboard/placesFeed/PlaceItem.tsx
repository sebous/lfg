import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { GetPlaces_getPlaces_joinedUsers, JoinPlace, LeavePlace, RemovePlace } from "../../../common/graphqlTypes";
import { useGlobalState } from "../../../common/state";
import { useLongPress } from "../../../hooks/useLongPress";
import { REMOVE_PLACE, JOIN_PLACE, LEAVE_PLACE } from "../../../gql/places.graphql";

interface PlaceItemProps {
  id: string;
  name: string;
  joinedUsers: GetPlaces_getPlaces_joinedUsers[];
  ownerId: string;
}

export const PlaceItem: React.FC<PlaceItemProps> = ({ id, name, joinedUsers, ownerId }) => {
  const [user] = useGlobalState("user");
  if (!user) throw Error("user not authenticated");

  const [joinPlace] = useMutation<JoinPlace>(JOIN_PLACE);
  const [leavePlace] = useMutation<LeavePlace>(LEAVE_PLACE);
  const [removePlace] = useMutation<RemovePlace>(REMOVE_PLACE);

  // join current user to place, remove if has already joined
  const updateFn = () => {
    // join
    if (!joinedUsers.find(u => u.id === user.id)) {
      joinPlace({
        variables: {
          placeId: id,
        },
      });
    }
    // leave
    else {
      leavePlace({
        variables: {
          placeId: id,
        },
      });
    }
  };

  // delete place
  // TODO: deletion should be in 2 steps, show delete btn and after click validate&delete
  const deleteFn = () => {
    // user can delete only his own places
    // TODO: admin can delete others tho, maybe remove this in the future
    if (ownerId !== user.id) {
      // TODO: throw nice error here
      return;
    }

    removePlace({
      variables: { placeId: id },
    });
  };

  const onHold = useLongPress(500, deleteFn);

  return (
    <div {...onHold}>
      <Card onClick={updateFn}>
        <Card.Content header={name} />
        <Card.Content extra>
          <Icon name="user" />
          {joinedUsers.length} boys would smash this
        </Card.Content>
      </Card>
    </div>
  );
};
