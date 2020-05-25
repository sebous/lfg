import React, { useState, useRef, useMemo } from "react";
import { loremIpsum } from "lorem-ipsum";
import {
  PlaceCardWrapper,
  PlaceCardHeader,
  PlaceCardDescription,
  PlaceCardBackground,
  PlaceCardBottom,
  PlaceCardCloseOverlay,
} from "./style";
import { shortenString } from "../../../common/stringUtil";
import { GetPlaces_getPlaces_joinedUsers } from "../../../common/graphqlTypes";
import { PlaceQueue } from "../PlaceQueue";
import { Btn, BtnDanger } from "../Button";
import { useLongPress } from "../../../hooks/useLongPress";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

interface PlaceCardProps {
  name?: string;
  description?: string;
  userQueue: GetPlaces_getPlaces_joinedUsers[];
  selfQueued: boolean;
  joinLeaveFn: () => void;
  deletePlaceFn: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ userQueue, selfQueued, joinLeaveFn, deletePlaceFn }) => {
  const [closeVisible, setCloseVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const onHold = useLongPress(500, () => setCloseVisible(true));
  useOutsideClick(elementRef, () => setCloseVisible(false));

  const dummyDescription = useMemo(() => shortenString(loremIpsum({ count: 50 }), 140), []);

  return (
    <div ref={elementRef}>
      <PlaceCardWrapper {...onHold} onBlur={() => setCloseVisible(false)}>
        <PlaceCardBackground />
        <PlaceCardHeader>Music lab</PlaceCardHeader>
        <PlaceCardDescription>{dummyDescription}</PlaceCardDescription>
        <PlaceCardCloseOverlay visible={closeVisible}>
          <BtnDanger onClick={deletePlaceFn}>delete</BtnDanger>
        </PlaceCardCloseOverlay>
        <PlaceCardBottom>
          <PlaceQueue userQueue={userQueue} />
          {!selfQueued ? <Btn onClick={joinLeaveFn}>join</Btn> : <BtnDanger onClick={joinLeaveFn}>leave</BtnDanger>}
        </PlaceCardBottom>
      </PlaceCardWrapper>
    </div>
  );
};
