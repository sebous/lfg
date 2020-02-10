/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DummyLogin
// ====================================================

export interface DummyLogin_dummyLogin {
  __typename: "User";
  id: string;
  username: string;
}

export interface DummyLogin {
  dummyLogin: DummyLogin_dummyLogin;
}

export interface DummyLoginVariables {
  username: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPlace
// ====================================================

export interface AddPlace_addPlace {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsersIds: string[];
}

export interface AddPlace {
  addPlace: AddPlace_addPlace;
}

export interface AddPlaceVariables {
  placeInput: NewPlaceInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersInQueueQuery
// ====================================================

export interface GetUsersInQueueQuery_getUsersInQueue {
  __typename: "User";
  id: string;
  username: string;
}

export interface GetUsersInQueueQuery {
  getUsersInQueue: GetUsersInQueueQuery_getUsersInQueue[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePlaceJoined
// ====================================================

export interface UpdatePlaceJoined_updatePlace_createdBy {
  __typename: "User";
  id: string;
}

export interface UpdatePlaceJoined_updatePlace {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsersIds: string[];
  createdBy: UpdatePlaceJoined_updatePlace_createdBy;
}

export interface UpdatePlaceJoined {
  updatePlace: UpdatePlaceJoined_updatePlace;
}

export interface UpdatePlaceJoinedVariables {
  placeInfo: UpdatePlaceInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlacesQuery
// ====================================================

export interface PlacesQuery_getPlaces_createdBy {
  __typename: "User";
  id: string;
}

export interface PlacesQuery_getPlaces {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsersIds: string[];
  createdBy: PlacesQuery_getPlaces_createdBy;
}

export interface PlacesQuery {
  getPlaces: PlacesQuery_getPlaces[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PlacesSubscription
// ====================================================

export interface PlacesSubscription_placesSubscription_data_createdBy {
  __typename: "User";
  id: string;
}

export interface PlacesSubscription_placesSubscription_data {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsersIds: string[];
  createdBy: PlacesSubscription_placesSubscription_data_createdBy;
}

export interface PlacesSubscription_placesSubscription {
  __typename: "PlaceNotificationType";
  id: string;
  date: any;
  data: PlacesSubscription_placesSubscription_data;
}

export interface PlacesSubscription {
  placesSubscription: PlacesSubscription_placesSubscription;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface NewPlaceInput {
  name: string;
  createdById: string;
  joinedUsersIds?: string[] | null;
}

export interface UpdatePlaceInput {
  id: string;
  joinedUsersIds?: string[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
