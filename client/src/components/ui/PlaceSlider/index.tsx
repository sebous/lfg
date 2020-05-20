import React, { useRef } from "react";
import _ from "lodash";
import { useDrag } from "react-use-gesture";
import { useSprings, animated } from "react-spring";
import { GetPlaces_getPlaces } from "../../../common/graphqlTypes";
import { PlaceCardsContainer } from "../PlaceCard/style";
import { PlaceCard } from "../PlaceCard";

interface PlaceSliderProps {
  places: GetPlaces_getPlaces[];
  currentUserId: string;
}

export const PlaceSlider: React.FC<PlaceSliderProps> = ({ places, currentUserId }) => {
  // animation
  const index = useRef(0);
  const [animationProps, setAnimationProps] = useSprings(places.length, i => ({
    x: i * window.innerWidth,
    scale: 1,
    display: "block",
  }));

  const dragBinding = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 3 && cancel) {
      const returnPlaceIndex = _.clamp(index.current + (xDir > 0 ? -1 : 1), 0, places.length - 1);
      index.current = returnPlaceIndex;
      cancel();
    }
    setAnimationProps((i: number) => {
      if (i < index.current - 1 || i > index.current + 1) return { display: "none" };
      const x = (i - index.current) * window.innerWidth + (down ? mx : 0);
      const scale = down ? 1 - distance / window.innerWidth / 2 : 1;
      return { x, scale, display: "block" };
    });
  });

  return (
    <PlaceCardsContainer>
      {places.map(({ id, joinedUsers, name, owner }, i) => (
        <animated.div
          {...dragBinding()}
          key={id}
          style={{
            display: animationProps[i].display,
            x: animationProps[i].x,
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
        >
          <animated.div style={{ scale: animationProps[i].scale, padding: "1rem" }}>
            <PlaceCard
              key={id}
              name={name}
              selfQueued={joinedUsers?.some(user => user.id === currentUserId) ?? false}
              userQueue={joinedUsers ?? []}
            />
          </animated.div>
        </animated.div>
      ))}
    </PlaceCardsContainer>
  );
};
