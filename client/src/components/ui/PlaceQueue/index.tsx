import React from "react";
import { GetPlaces_getPlaces_joinedUsers } from "../../../common/graphqlTypes";
import { PlaceQueueWrapper } from "./style";
import { UserIcon } from "../UserIcon";

interface PlaceQueueProps {
  userQueue: GetPlaces_getPlaces_joinedUsers[];
}

export const PlaceQueue: React.FC<PlaceQueueProps> = ({ userQueue }) => {
  const SHOWN_USERS_COUNT = userQueue.length > 5 ? 4 : 5;
  const usersToShow = userQueue.slice(0, SHOWN_USERS_COUNT);
  const usersHidden = userQueue.length - SHOWN_USERS_COUNT;

  return (
    <PlaceQueueWrapper>
      {usersToShow.map(({ avatar, id }) => (
        <UserIcon key={id} avatar={avatar ?? undefined} size="SMALL" spaced />
      ))}
      {usersHidden > 0 && <UserIcon isCounter count={usersHidden} size="SMALL" spaced />}
    </PlaceQueueWrapper>
  );
};
