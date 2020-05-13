import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { UserIcon } from "../UserIcon";
import { UserIconSliderWrapper } from "./style";

interface UserIconSliderProps {
  people: { username: string; id: string; avatar?: string }[];
}

export const UserIconSlider: React.FC<UserIconSliderProps> = ({ people }) => (
  <UserIconSliderWrapper>
    <CarouselProvider
      naturalSlideHeight={100}
      naturalSlideWidth={86}
      totalSlides={people.length}
      touchEnabled
      visibleSlides={5}
      orientation="horizontal"
      isPlaying
      infinite
      interval={5000}
    >
      <Slider>
        {people.map((person, i) => (
          <Slide index={i} key={person.id}>
            <UserIcon name={person.username} avatar={person.avatar} size="LARGE" />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  </UserIconSliderWrapper>
);
