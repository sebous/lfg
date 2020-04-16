import React, { useState, createRef, useEffect } from "react";
import { Menu, Icon, Modal, Input, Button } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Place } from "../../../common/types";
import { useGlobalState } from "../../../common/state";
import { placeFactory } from "../../../common/factories";
import { AddPlace } from "../../../common/graphqlTypes";

const ADD_PLACE = gql`
  mutation AddPlace($placeInput: NewPlaceInput!) {
    addPlace(placeInput: $placeInput) {
      id
      name
      joinedUsersIds
    }
  }
`;

// TODO: split this by each button with it's own functionallity
export const DashboardBottomBar: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user] = useGlobalState("user");
  const inputRef = createRef<any>();
  const [addPlace] = useMutation<AddPlace>(ADD_PLACE);

  const addBtnClicked = () => {
    setModalOpen(!isModalOpen);
  };

  const cancelAdding = () => {
    // modal's input is cleared by closing the modal
    setModalOpen(false);
  };

  const confirmAdding = () => {
    // this is weird but it works
    const inputVal = inputRef.current.inputRef.current.value;
    setModalOpen(false);
    addPlace({
      variables: {
        placeInput: {
          name: inputVal,
          createdById: user?.id,
        },
      },
    });
  };

  return (
    <>
      {/* Bottom menu */}
      <Menu icon>
        <Menu.Item name="add place" onClick={addBtnClicked}>
          <Icon name="add" />
        </Menu.Item>
      </Menu>

      {/* Modal */}
      <Modal
        size="small"
        dimmer="blurring"
        open={isModalOpen}
        onMount={() => inputRef.current?.focus()}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>Add place to go</Modal.Header>
        <Modal.Content>
          <Input focus placeholder="Music lab" fluid ref={inputRef} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => cancelAdding()}>
            Cancel
          </Button>
          <Button positive icon="checkmark" labelPosition="right" content="Add" onClick={() => confirmAdding()} />
        </Modal.Actions>
      </Modal>
    </>
  );
};
