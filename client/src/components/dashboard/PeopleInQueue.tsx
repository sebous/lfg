import React from "react";
import { Grid, Image, Container } from "semantic-ui-react";

interface Person {
  username: string;
  picUrl: string;
}
const picUrl =
  "https://www.berning-galabau.de/uploads/images/ansprechpartner/profil-pic_dummy.png";

const dummyPeople: Person[] = [
  { username: "Franta", picUrl },
  { username: "Pepa", picUrl },
  { username: "Honza", picUrl },
  { username: "Jara", picUrl }
];

export const PeopleInQueue: React.FC = () => {
  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {dummyPeople.map(({ username, picUrl }, i) => (
          <Grid.Column key={i} mobile={4}>
            <Image src={picUrl} />
            <div style={{ textAlign: "center" }}>{username}</div>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};
