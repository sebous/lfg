import React, { useRef } from "react";
import _ from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { GetPlaces, GetPlaces_getPlaces } from "../../../common/graphqlTypes";
import { GET_PLACES } from "../../../gql/places.graphql";
import { PlaceCardsContainer } from "../../ui/PlaceCard/style";
import { usePlacesSubscription } from "../../../hooks/usePlacesSubscription";
import { PlaceCard } from "../../ui/PlaceCard";
import { useGlobalState } from "../../../common/state";

export const PlacesFeed: React.FC = () => {
  const [currentUser] = useGlobalState("user");

  // load data
  const { loading, data, error } = useQuery<GetPlaces>(GET_PLACES);

  // TODO: add loading, handle error, handle no results

  // subscribe to updates
  usePlacesSubscription(data);

  // sort data
  // const sortedData = _.orderBy(data?.getPlaces, p => p.joinedUsers?.length ?? 0, ["desc"]);
  const sortedData: GetPlaces_getPlaces[] = _.range(4).map(n => ({
    id: String(n),
    name: "Music Lab",
    __typename: "Place",
    owner: { __typename: "User", id: "asdasd" },
    joinedUsers: [],
  }));

  // animation
  const index = useRef(0);
  const [animationProps, setAnimationProps] = useSprings(sortedData.length, i => ({
    x: i * window.innerWidth,
    scale: 1,
    display: "block",
  }));

  const dragBinding = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 3 && cancel) {
      const returnPlaceIndex = _.clamp(index.current + (xDir > 0 ? -1 : 1), 0, sortedData.length - 1);
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
      {data &&
        sortedData.map(({ id, joinedUsers, name, owner }, i) => (
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
                selfQueued={joinedUsers?.some(user => user.id === currentUser?.id) ?? false}
                userQueue={joinedUsers ?? []}
              />
            </animated.div>
          </animated.div>
        ))}
    </PlaceCardsContainer>
  );
};
