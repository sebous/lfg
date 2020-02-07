import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { UpdatePlaceJoined } from "../../../common/graphqlTypes";
import { useGlobalState } from "../../../common/state";

const UPDATE_PLACE_JOINED = gql`
  mutation UpdatePlaceJoined($placeInfo: UpdatePlaceInput!) {
    updatePlace(placeInfo: $placeInfo) {
      id
      name
      joinedUsersIds
      createdBy {
        id
      }
    }
  }
`;

interface PlaceItemProps {
  id: string;
  name: string;
  joinedUsersIds: string[];
  clickHandler: () => void;
}

export const PlaceItem: React.FC<PlaceItemProps> = props => {
  const [user] = useGlobalState("user");
  const [updatePlace] = useMutation<UpdatePlaceJoined>(UPDATE_PLACE_JOINED);
  if (!user) throw Error("user not authenticated");
  return (
    <Card
      onClick={() => {
        let users = [...props.joinedUsersIds];
        if (users.indexOf(user.id) > -1) {
          users = users.filter(u => u !== user.id);
        } else {
          users.push(user.id);
        }

        updatePlace({
          variables: {
            placeInfo: {
              id: props.id,
              joinedUsersIds: users,
            },
          },
        });
      }}
    >
      <Card.Content header={props.name} />
      <Card.Content extra>
        <Icon name="user" />
        {props.joinedUsersIds.length} boys would smash this
      </Card.Content>
    </Card>
  );
};
