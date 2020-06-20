import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ActionsBarContainer } from "../../ui/Container";
import { BtnAction } from "../../ui/Button";
import { PlusIcon, BeerIcon, LeaveIcon } from "../../ui/icons";
import { useGlobalState } from "../../../common/state";
import { AddPlace, QueueSelf, LeaveQueue } from "../../../common/graphqlTypes";
import { ADD_PLACE } from "../../../gql/places.graphql";
import { ModalAddPlace } from "../../ui/Modal";
import { QUEUE_SELF, LEAVE_QUEUE } from "../../../gql/peopleQueue.graphql";

export const ActionsBar: React.FC = () => {
  const [user, setUser] = useGlobalState("user");
  const [addPlace] = useMutation<AddPlace>(ADD_PLACE);
  const [queueSelf] = useMutation<QueueSelf>(QUEUE_SELF);
  const [leaveQueue] = useMutation<LeaveQueue>(LEAVE_QUEUE);

  // modal logic
  const [modalOpen, setModalOpen] = useState(false);

  // add place
  const addPlaceFn = (name: string, description?: string) => {
    setModalOpen(false);
    addPlace({
      variables: {
        placeInput: {
          name,
          description,
        },
      },
    });
  };

  // queue self
  const queueSelfFn = () => {
    if (!user) return;
    if (!user.queuing) {
      setUser(prevState => (prevState ? { ...prevState, queuing: true } : undefined));
      queueSelf();
    } else {
      setUser(prevState => (prevState ? { ...prevState, queuing: false } : undefined));
      leaveQueue();
    }
  };

  return (
    <>
      <ActionsBarContainer>
        <BtnAction iconNormal={<PlusIcon />} onClick={() => setModalOpen(true)} />
        <BtnAction
          toggled={user?.queuing}
          iconNormal={<BeerIcon />}
          iconToggled={<LeaveIcon />}
          onClick={() => queueSelfFn()}
        />
      </ActionsBarContainer>
      <ModalAddPlace addPlaceFn={addPlaceFn} closeFn={() => setModalOpen(false)} isOpen={modalOpen} />
    </>
  );
};
