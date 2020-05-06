import React from "react";
import _ from "lodash";
import { UserIconWrapper, UserIconImgWrapper, UserIconImg, UserIconText } from "./style";

interface UserIconProps {
  name?: string;
  avatar?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ name, avatar }) => (
  <UserIconWrapper>
    <UserIconImgWrapper>
      <UserIconImg src={avatar} alt={name} />
    </UserIconImgWrapper>
    {/* TODO: in the future replace this with better solution from FB api */}
    <UserIconText>{_.words(name)[0]}</UserIconText>
  </UserIconWrapper>
);
