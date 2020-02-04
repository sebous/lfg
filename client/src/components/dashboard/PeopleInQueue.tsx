import React from "react";
import _ from "lodash";
import { Grid, Image, Container } from "semantic-ui-react";
import { dummyUserFactory } from "../../common/factories";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import { useGlobalState } from "../../common/state";

const dummyAvatar =
  "https://www.berning-galabau.de/uploads/images/ansprechpartner/profil-pic_dummy.png";

const dummyPeople = _.range(4).map(() =>
  dummyUserFactory(uniqueNamesGenerator({ dictionaries: [names], length: 1 }))
);

export const PeopleInQueue: React.FC = () => {
  const [peopleInQueue] = useGlobalState("peopleInQueue");
  const dataset = peopleInQueue.length > 0 ? peopleInQueue : dummyPeople;

  return (
    <Container>
      <Grid style={{ margin: 0 }}>
        {dataset.map(({ username, avatar }, i) => (
          <Grid.Column key={i} mobile={4}>
            <Image src={avatar ?? dummyAvatar} />
            <div style={{ textAlign: "center" }}>{username}</div>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};
