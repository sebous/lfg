import React from "react";
import _ from "lodash";
import { Grid, Image, Container } from "semantic-ui-react";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { dummyUserFactory } from "../../common/factories";
import { useGlobalState } from "../../common/state";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const dummyAvatar =
  "https://www.berning-galabau.de/uploads/images/ansprechpartner/profil-pic_dummy.png";

const dummyPeople = _.range(6).map(() =>
  dummyUserFactory(uniqueNamesGenerator({ dictionaries: [names], length: 1 }))
);

const GET_USERS_IN_QUEUE = gql`
  query {
    getUsersInQueue {
      id
      username
    }
  }
`;

const USER_QUEUE_SUBSCRIPTION = gql`
  subscription {
    userQueueSubscription {
      id
    }
  }
`;

interface GetUsersInQueue {
  getUsersInQueue: User[];
}

interface User {
  id: string;
  username: string;
}

export const PeopleInQueue: React.FC = () => {
  const [peopleInQueue] = useGlobalState("peopleInQueue");
  const dataset = peopleInQueue.length > 0 ? peopleInQueue : dummyPeople;
  const { loading, data, error, subscribeToMore } = useQuery(
    GET_USERS_IN_QUEUE
  );
  // subscribeToMore({
  //   document: USER_QUEUE_SUBSCRIPTION,
  //   updateQuery: (prev, { subscriptionData }) => {
  //     console.log(prev, subscriptionData);
  //     return prev;
  //   },
  // });
  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  if (!data) return <p>no users in queue</p>;

  return (
    <CarouselProvider
      naturalSlideHeight={105}
      naturalSlideWidth={86}
      totalSlides={data.length}
      touchEnabled={true}
      visibleSlides={4}
      orientation={"horizontal"}
      isPlaying={true}
      infinite={true}
      interval={5000}
    >
      <Slider>
        {dataset.map((user, i) => (
          <Slide index={i} key={i}>
            <div style={{ padding: "0.5rem" }}>
              <Image src={dummyAvatar} />
              <div style={{ textAlign: "center" }}>{user.username}</div>
            </div>
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};
