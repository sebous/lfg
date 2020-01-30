import React from "react";
import { Box } from "grommet";

export const AppBar: React.FC = () => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="gray"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
    />
  );
};
