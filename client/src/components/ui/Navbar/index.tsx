import React from "react";
import { NavbarWrapper, NavbarHeader, NavbarAvatar, NavbarUsername, NavbarAvatarImg } from "./style";

interface NavbarProps {
  username?: string;
  avatar?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ username, avatar }) => (
  <NavbarWrapper>
    <NavbarHeader>LFG</NavbarHeader>
    <NavbarUsername>{username}</NavbarUsername>
    <NavbarAvatar>
      <NavbarAvatarImg src={avatar} alt={username} />
    </NavbarAvatar>
  </NavbarWrapper>
);
