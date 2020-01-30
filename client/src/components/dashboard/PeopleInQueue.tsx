import React from "react";
import { Box, Image, Text } from "grommet";

interface Person {
  username: string;
  picUrl: string;
}
const picUrl = "https://www.berning-galabau.de/uploads/images/ansprechpartner/profil-pic_dummy.png";

const dummyPeople: Person[] = [
  { username: "Franta", picUrl },
  { username: "Pepa", picUrl },
  { username: "Honza", picUrl },
  { username: "Jara", picUrl }
]

export const PeopleInQueue: React.FC = () => {
  return (
    <Box
      direction="row"
      alignContent="start"
      border="bottom"
    >
      {dummyPeople.map(({ username, picUrl }, i) => (
        <Box key={i} direction="column" alignContent="start" height={{ max: "100%" }}>
          <Box pad={{ left: "small", right: "small", top: "small" }}>
            <Box pad={{ bottom: "small" }}>
              <Image src={picUrl} fit="contain" width="100%"></Image>
            </Box>
            <Box pad={{ bottom: "small" }} align="center">
              <Text>{username}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}