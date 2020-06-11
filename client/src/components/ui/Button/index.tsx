import React from "react";
import { BtnActionWrapper } from "./style";

interface BtnActionProps {
  iconNormal: React.ReactNode;
  iconToggled?: React.ReactNode;
  toggled?: boolean;
  onClick?: () => void;
}

export const BtnAction: React.FC<BtnActionProps> = ({ toggled, iconNormal, iconToggled, onClick }) => (
  <BtnActionWrapper onClick={onClick}>{toggled ? iconToggled : iconNormal}</BtnActionWrapper>
);
