import React from "react";
import _ from "lodash";
import { Grid, Image, Container } from "semantic-ui-react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { GetPeopleInQueue_getPeopleInQueue } from "../../../common/graphqlTypes";

const dummyAvatar = "https://www.berning-galabau.de/uploads/images/ansprechpartner/profil-pic_dummy.png";

export interface PeopleInQueueProps {
  people?: GetPeopleInQueue_getPeopleInQueue[];
}

export const PeopleInQueue: React.FC<PeopleInQueueProps> = ({ people }) => {
  return (
    <>
      {people && (
        <CarouselProvider
          naturalSlideHeight={105}
          naturalSlideWidth={86}
          totalSlides={people.length}
          touchEnabled
          visibleSlides={4}
          orientation="horizontal"
          isPlaying
          infinite
          interval={5000}
        >
          <Slider>
            {people.map((person, i) => (
              <Slide index={i} key={i}>
                <div style={{ padding: "0.5rem" }}>
                  <Image src={dummyAvatar} />
                  <div style={{ textAlign: "center" }}>{person.username}</div>
                </div>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      )}
    </>
  );
};
