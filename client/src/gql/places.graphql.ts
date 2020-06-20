import { gql } from "apollo-boost";

export const GET_PLACES = gql`
  query GetPlaces {
    getPlaces {
      id
      name
      description
      joinedUsers {
        id
        username
        avatar
      }
      owner {
        id
      }
    }
  }
`;

export const ADD_PLACE = gql`
  mutation AddPlace($placeInput: NewPlaceInput!) {
    addPlace(placeInput: $placeInput) {
      id
      name
      description
    }
  }
`;

export const JOIN_PLACE = gql`
  mutation JoinPlace($placeId: String!) {
    joinPlace(placeId: $placeId) {
      id
      name
      description
      joinedUsers {
        id
        username
        avatar
      }
      owner {
        id
      }
    }
  }
`;

export const LEAVE_PLACE = gql`
  mutation LeavePlace($placeId: String!) {
    leavePlace(placeId: $placeId) {
      id
      name
      description
      joinedUsers {
        id
        username
        avatar
      }
      owner {
        id
      }
    }
  }
`;

export const REMOVE_PLACE = gql`
  mutation RemovePlace($placeId: String!) {
    removeOnePlace(placeId: $placeId)
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
        description
        joinedUsers {
          id
          username
          avatar
        }
        owner {
          id
        }
      }
    }
  }
`;
