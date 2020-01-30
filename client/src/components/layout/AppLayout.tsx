import React from "react";
import { Box, Grommet } from "grommet";
import { HeaderBar } from "../HeaderBar";

export const AppLayout: React.FC = ({ children }) => (
  <Grommet plain>
    <Box fill>
      <HeaderBar />
      <Box>{children}</Box>
    </Box>
  </Grommet>
);
