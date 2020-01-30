import React, { useState } from "react";
import { Box } from "grommet";
import { PeopleInQueue } from "./PeopleInQueue";

export const Dashbaord: React.FC = () => {
  return (
    <Box height="calc(100vh - 36px)">
      <Box height="20%"><PeopleInQueue></PeopleInQueue></Box>
      <Box height="60%"></Box>
      <Box height="20%"></Box>
    </Box>
  );
};
