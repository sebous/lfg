import { Place } from "./types";
import uuid from "uuid";

export function placeFactory(name: string): Place {
  return {
    id: uuid.v4(),
    name,
    peopleJoined: []
  };
}
