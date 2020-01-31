import React from "react";
import { useGlobalState } from "../../common/state";
import { Menu } from "semantic-ui-react";

export const HeaderBar: React.FC = () => {
  const [user] = useGlobalState("user");
  return (
    <Menu
      inverted
      style={{ height: "36px", width: "100%", borderRadius: 0, margin: 0 }}
    >
      <Menu.Item position="right" name={user?.username ?? ""} />
    </Menu>
  );
};
