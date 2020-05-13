import React from "react";
import _ from "lodash";
import { UserIconWrapper, UserIconImgWrapper, UserIconImg, UserIconText, UserIconCounter } from "./style";

interface UserIconProps {
  name?: string;
  avatar?: string;
  isCounter?: boolean;
  count?: number;
  size: "SMALL" | "LARGE";
  spaced?: boolean;
}

export const UserIcon: React.FC<UserIconProps> = ({ name, avatar, size, spaced, isCounter, count }) => (
  <UserIconWrapper>
    <UserIconImgWrapper size={size} spaced={spaced} border={isCounter}>
      {!isCounter && <UserIconImg src={avatar} alt={name} />}
      {isCounter && <UserIconCounter>+{count}</UserIconCounter>}
    </UserIconImgWrapper>

    {/* TODO: in the future replace this with better solution from FB api */}
    {name && <UserIconText>{_.words(name)[0]}</UserIconText>}
  </UserIconWrapper>
);
