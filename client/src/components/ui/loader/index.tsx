import React from "react";
import { LoaderWrapper } from "./style";

export interface LoaderProps {
  visible: boolean;
  fullscreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ visible, fullscreen }) => {
  return (
    <LoaderWrapper>
      <span />
    </LoaderWrapper>
  );
};
