import React from "react";
import { Menu, Icon } from "semantic-ui-react";

export const DashboardBottomBar: React.FC = () => {
  const handleAddClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    console.log("add");
  };

  return (
    <Menu icon>
      <Menu.Item name="add place" onClick={handleAddClick}>
        <Icon name="add"></Icon>
      </Menu.Item>
    </Menu>
  );
};
