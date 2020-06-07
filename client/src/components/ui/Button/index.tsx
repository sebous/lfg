import React from "react";
import { BtnActionWrapper } from "./style";

interface BtnActionProps {
  toggled?: boolean;
  ToggleOnIcon?: React.ReactNode;
  ToggleOffIcon: React.ReactNode;
  onClick?: () => void;
}

export const BtnAction: React.FC<BtnActionProps> = ({ toggled, ToggleOffIcon, ToggleOnIcon, onClick }) => (
  <BtnActionWrapper onClick={onClick}>{toggled ? ToggleOnIcon : ToggleOffIcon}</BtnActionWrapper>
);
