import { createGlobalState } from "react-hooks-global-state";

interface User {
  username: string;
  userId: string;
}

interface GlobalState {
  isAuthorized: boolean;
  user: User | undefined;
}

const defaultState: GlobalState = {
  isAuthorized: false,
  user: undefined
};

export const { useGlobalState } = createGlobalState(defaultState);
