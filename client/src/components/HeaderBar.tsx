import React from "react";
import { Box, Text } from "grommet";
import { useGlobalState } from "../lib/state";

export const HeaderBar: React.FC = () => {
  const [user] = useGlobalState("user");
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="end"
      height="36px"
      background="gray"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <Text>{user?.username ?? ""}</Text>
    </Box>
  );
};
