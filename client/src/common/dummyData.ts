import _ from "lodash";
import uuid from "uuid";
import { starWars, uniqueNamesGenerator } from "unique-names-generator";
import { GetPeopleInQueue_getPeopleInQueue } from "./graphqlTypes";

export const dummyAvatar = "https://www.berning-galabau.de/uploads/images/ansprechpartner/profil-pic_dummy.png";

export const dummyPeopleInQueue = (count: number): GetPeopleInQueue_getPeopleInQueue[] =>
  _.range(count).map(() => ({
    __typename: "User",
    id: uuid.v4(),
    username: uniqueNamesGenerator({ dictionaries: [starWars], length: 1 }),
    avatar: dummyAvatar,
  }));
