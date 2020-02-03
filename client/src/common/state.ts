import { createGlobalState } from "react-hooks-global-state";
import { User, Place } from "./types";

interface GlobalState {
  isAuthorized: boolean;
  user: User | undefined;
  activePlaces: Place[];
}

const defaultState: GlobalState = {
  isAuthorized: false,
  user: undefined,
  activePlaces: []
};

export const { useGlobalState } = createGlobalState(defaultState);
