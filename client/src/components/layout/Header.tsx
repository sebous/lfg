import React from "react";
import { useGlobalState } from "../../common/state";
import { Navbar } from "../ui/Navbar";

export const Header: React.FC = () => {
  const [user] = useGlobalState("user");
  return <Navbar username={user?.username ?? ""} avatar={user?.avatar ?? ""} />;
};
