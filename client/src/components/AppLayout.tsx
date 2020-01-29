import React from "react";
import { Box, Grommet } from "grommet";
import { AppBar } from "./AppBar";

export const AppLayout: React.FC = ({ children }) => (
    <Grommet plain>
        <Box fill>
            <AppBar />
            <Box>
                {children}
            </Box>
        </Box>
    </Grommet>
);
