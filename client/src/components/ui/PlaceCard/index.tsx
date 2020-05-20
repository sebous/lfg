import React from "react";
import { loremIpsum } from "lorem-ipsum";
import { PlaceCardWrapper, PlaceCardHeader, PlaceCarDescription, PlaceCardBackground, PlaceCardBottom } from "./style";
import { shortenString } from "../../../common/stringUtil";
import { GetPlaces_getPlaces_joinedUsers } from "../../../common/graphqlTypes";
import { PlaceQueue } from "../PlaceQueue";
import { Btn, BtnDanger } from "../Button";

interface PlaceCardProps {
  name?: string;
  description?: string;
  userQueue: GetPlaces_getPlaces_joinedUsers[];
  selfQueued: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ userQueue, selfQueued }) => (
  <PlaceCardWrapper>
    <PlaceCardBackground />
    <PlaceCardHeader>Music lab</PlaceCardHeader>
    <PlaceCarDescription>{shortenString(loremIpsum({ count: 50 }), 140)}</PlaceCarDescription>
    <PlaceCardBottom>
      <PlaceQueue userQueue={userQueue} />
      {!selfQueued ? <Btn>join</Btn> : <BtnDanger>leave</BtnDanger>}
    </PlaceCardBottom>
  </PlaceCardWrapper>
);
