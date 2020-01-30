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
        // row wrapper
        <Box key={i} direction="column" alignContent="start" height={{ max: "100%" }}>
          {/* card wrapper */}
          <Box pad={{ left: "small", right: "small", top: "small" }}>
            {/* image */}
            <Box pad={{ bottom: "small" }}>
              <Box border={{ color: "brand", size: "small" }} elevation="small" round={{ size: "small" }}>
                <Image src={picUrl} fit="cover" width="100%"></Image>
              </Box>
            </Box>
            {/* username */}
            <Box pad={{ bottom: "small" }} align="center">
              <Text>{username}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}