import uuid from "uuid";
import { Place, User } from "./types";

export function placeFactory(name: string): Place {
  return {
    id: uuid.v4(),
    name,
    joinedUsersIds: [],
  };
}

export function dummyUserFactory(name: string): User {
  return {
    id: uuid.v4(),
    username: name,
  };
}
