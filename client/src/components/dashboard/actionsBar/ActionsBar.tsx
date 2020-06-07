import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { ActionsBarContainer } from "../../ui/Container";
import { BtnAction } from "../../ui/Button";
import { PlusIcon, BeerIcon } from "../../ui/icons";
import { useGlobalState } from "../../../common/state";

export const ActionsBar: React.FC = () => {
  // TODO: extract logic to custom hook(s)
  const [user] = useGlobalState("user");

  // modal logic
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <ActionsBarContainer>
        <BtnAction
          toggled={user?.queuing}
          ToggleOffIcon={<BeerIcon />}
          ToggleOnIcon={<PlusIcon />}
          onClick={() => console.log("queueing")}
        />
        <BtnAction ToggleOffIcon={<PlusIcon />} onClick={() => setModalOpen(true)} />
      </ActionsBarContainer>
      <ReactModal
        isOpen={modalOpen}
        contentLabel="add place"
        ariaHideApp={false}
        onRequestClose={() => setModalOpen(false)}
      >
        <p>wtf</p>
      </ReactModal>
    </>
  );
};
