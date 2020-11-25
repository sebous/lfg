import { gql, makeVar, InMemoryCache } from "@apollo/client";

export const isAuthVar = makeVar(false);

export const queuingVar = makeVar(false);

export type User = {
  __typename: "User";
  id: string;
  username: string;
  name: string | null;
  fbId: string | null;
  avatar: string | null;
  queuing: boolean;
};
export const userInfoVar = makeVar<User | undefined>(undefined);

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Place: {
      fields: {
        joinedUsers: { merge: false },
      },
    },
    Query: {
      fields: {
        getPeopleInQueue: {
          merge: false,
        },
        getPlaces: {
          merge: false,
        },
      },
    },

    // local state
    State: {
      fields: {
        isAuth: {
          read() {
            return isAuthVar();
          },
        },
        queuing: {
          read() {
            return queuingVar();
          },
        },
        userInfo: {
          read() {
            return userInfoVar();
          },
        },
      },
    },
  },
});
