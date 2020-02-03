import React, { useState, createRef } from "react";
import { Menu, Icon, Modal, Input, Button } from "semantic-ui-react";
import { Place } from "../../../common/types";
import { useGlobalState } from "../../../common/state";
import { placeFactory } from "../../../common/factories";

// TODO: split this by each button with it's own functionallity
export const DashboardBottomBar: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [places, updatePlaces] = useGlobalState("activePlaces");
  const inputRef = createRef<any>();
  const addBtnClicked = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
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
    const newPlace = placeFactory(inputVal);
    updatePlaces(places => [...places, newPlace]);
    console.log(places);
    console.log(inputVal);
  };

  return (
    <React.Fragment>
      {/* Bottom menu */}
      <Menu icon>
        <Menu.Item name="add place" onClick={addBtnClicked}>
          <Icon name="add"></Icon>
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
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Add"
            onClick={() => confirmAdding()}
          ></Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};
