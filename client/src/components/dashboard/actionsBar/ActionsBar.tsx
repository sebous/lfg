import React from "react";
import { ActionsBarContainer } from "../../ui/Container";
import { BtnAction } from "../../ui/Button";
import { PlayIcon, PlusIcon } from "../../ui/icons";

export const ActionsBar: React.FC = () => {
  return (
    <ActionsBarContainer>
      <BtnAction>
        <PlayIcon />
      </BtnAction>
      <BtnAction>
        <PlusIcon />
      </BtnAction>
    </ActionsBarContainer>
  );
};
