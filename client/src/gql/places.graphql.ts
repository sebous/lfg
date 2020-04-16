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

export const UPDATE_PLACE = gql`
  mutation UpdatePlaceJoined($placeInfo: UpdatePlaceInput!) {
    updatePlace(placeInfo: $placeInfo) {
      id
      name
      joinedUsersIds
      createdBy {
        id
      }
    }
  }
`;

export const REMOVE_PLACE = gql`
  mutation RemovePlace($userId: String!, $placeId: String!) {
    removeOnePlace(userId: $userId, placeId: $placeId)
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
