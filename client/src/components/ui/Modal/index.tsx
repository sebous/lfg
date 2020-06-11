import React, { createRef } from "react";
import ReactModal from "react-modal";
import { theme } from "../theme";
import { Btn } from "../Button/style";
import { ModalAPheader, ModalAPinput } from "./style";

interface ModalAddPlaceProps {
  isOpen: boolean;
  closeFn: () => void;
  addPlaceFn: (name: string) => void;
}

export const ModalAddPlace: React.FC<ModalAddPlaceProps> = ({ addPlaceFn, closeFn, isOpen }) => {
  const inputRef = createRef<HTMLInputElement>();

  const addPlace = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    addPlaceFn(inputRef.current.value);
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="add place"
      ariaHideApp={false}
      onAfterOpen={focusInput}
      onRequestClose={closeFn}
      closeTimeoutMS={300}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,.6)",
          zIndex: 10,
        },
        content: {
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          top: "50%",
          transform: "translate(0,-50%)",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          border: "none",
          borderRadius: "4px",
          outline: "none",
          padding: "1rem",
          height: "180px",
          backgroundColor: theme.color.background,
        },
      }}
    >
      <ModalAPheader>Add new place</ModalAPheader>
      <ModalAPinput type="text" placeholder="Some nice pub.." ref={inputRef} />
      <Btn onClick={() => addPlace()}>OK</Btn>
    </ReactModal>
  );
};
