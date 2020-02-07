import { Place, User } from "./types";
import uuid from "uuid";

export function placeFactory(name: string): Place {
  return {
    id: uuid.v4(),
    name,
    joinedUsersIds: [],
  };
}

export function dummyUserFactory(name: string): User {
  return {
    userId: uuid.v4(),
    username: name,
  };
}
