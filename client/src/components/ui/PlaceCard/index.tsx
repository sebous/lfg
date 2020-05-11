import React from "react";
import { loremIpsum } from "lorem-ipsum";
import { PlaceCardWrapper, PlaceCartHeader, PlaceCartDescription } from "./style";
import { shortenString } from "../../../common/stringUtil";

interface PlaceCardProps {
  name?: string;
  description?: string;
  usersQueuing?: number;
}

export const PlaceCard: React.FC<PlaceCardProps> = () => (
  <PlaceCardWrapper>
    <PlaceCartHeader>Music lab</PlaceCartHeader>
    <PlaceCartDescription>{shortenString(loremIpsum({ count: 50 }), 150)}</PlaceCartDescription>9
  </PlaceCardWrapper>
);
