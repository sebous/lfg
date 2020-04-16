import { gql } from "apollo-boost";

export const GET_PLACES = gql`
  query GetPlaces {
    getPlaces {
      id
      name
      joinedUsersIds
      createdBy {
        id
      }
    }
  }
`;

export const PLACES_SUBSCRIPTION = gql`
  subscription PlacesSubs {
    placesSubscription {
      id
      date
      action
      data {
        id
        name
        joinedUsersIds
        createdBy {
          id
        }
      }
    }
  }
`;
