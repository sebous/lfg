import React from "react";
import { LoaderWrapper, LoaderInner, LoaderBounceFirst, LoaderBounce, LoaderBounceLast, LoaderText } from "./style";

interface LoaderProps {
  visible: boolean;
  fullscreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ visible, fullscreen }) => {
  return (
    <LoaderWrapper>
      <LoaderInner>
        <LoaderBounceFirst />
        <LoaderBounce />
        <LoaderBounceLast />
      </LoaderInner>
      <LoaderText>Logging in via FB</LoaderText>
    </LoaderWrapper>
  );
};
