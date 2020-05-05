/* tslint:disable */
/* eslint-disable */
// @generated
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
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginViaCookie
// ====================================================

export interface LoginViaCookie_loginViaCookie {
  __typename: "User";
  id: string;
  username: string;
  name: string | null;
  fbId: string | null;
  avatar: string | null;
  queuing: boolean;
}

export interface LoginViaCookie {
  loginViaCookie: LoginViaCookie_loginViaCookie | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FBlogin
// ====================================================

export interface FBlogin_FBlogin {
  __typename: "User";
  id: string;
  username: string;
  name: string | null;
  fbId: string | null;
  avatar: string | null;
  queuing: boolean;
}

export interface FBlogin {
  FBlogin: FBlogin_FBlogin | null;
}

export interface FBloginVariables {
  input: FBLoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPeopleInQueue
// ====================================================

export interface GetPeopleInQueue_getPeopleInQueue {
  __typename: "User";
  id: string;
  username: string;
}

export interface GetPeopleInQueue {
  getPeopleInQueue: GetPeopleInQueue_getPeopleInQueue[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: peopleQueueSubscription
// ====================================================

export interface peopleQueueSubscription_peopleQueueSubscription_data {
  __typename: "User";
  id: string;
  username: string;
}

export interface peopleQueueSubscription_peopleQueueSubscription {
  __typename: "UserNotificationType";
  id: string;
  date: any;
  action: string;
  data: peopleQueueSubscription_peopleQueueSubscription_data;
}

export interface peopleQueueSubscription {
  peopleQueueSubscription: peopleQueueSubscription_peopleQueueSubscription;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaces
// ====================================================

export interface GetPlaces_getPlaces_joinedUsers {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface GetPlaces_getPlaces_owner {
  __typename: "User";
  id: string;
}

export interface GetPlaces_getPlaces {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsers: GetPlaces_getPlaces_joinedUsers[] | null;
  owner: GetPlaces_getPlaces_owner;
}

export interface GetPlaces {
  getPlaces: GetPlaces_getPlaces[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPlace
// ====================================================

export interface AddPlace_addPlace {
  __typename: "Place";
  id: string;
  name: string;
}

export interface AddPlace {
  addPlace: AddPlace_addPlace;
}

export interface AddPlaceVariables {
  placeInput: NewPlaceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePlaceJoined
// ====================================================

export interface UpdatePlaceJoined_updatePlace_joinedUsers {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface UpdatePlaceJoined_updatePlace_owner {
  __typename: "User";
  id: string;
}

export interface UpdatePlaceJoined_updatePlace {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsers: UpdatePlaceJoined_updatePlace_joinedUsers[] | null;
  owner: UpdatePlaceJoined_updatePlace_owner;
}

export interface UpdatePlaceJoined {
  updatePlace: UpdatePlaceJoined_updatePlace;
}

export interface UpdatePlaceJoinedVariables {
  placeInfo: UpdatePlaceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinPlace
// ====================================================

export interface JoinPlace_joinPlace_joinedUsers {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface JoinPlace_joinPlace_owner {
  __typename: "User";
  id: string;
}

export interface JoinPlace_joinPlace {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsers: JoinPlace_joinPlace_joinedUsers[] | null;
  owner: JoinPlace_joinPlace_owner;
}

export interface JoinPlace {
  joinPlace: JoinPlace_joinPlace;
}

export interface JoinPlaceVariables {
  placeId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LeavePlace
// ====================================================

export interface LeavePlace_leavePlace_joinedUsers {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface LeavePlace_leavePlace_owner {
  __typename: "User";
  id: string;
}

export interface LeavePlace_leavePlace {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsers: LeavePlace_leavePlace_joinedUsers[] | null;
  owner: LeavePlace_leavePlace_owner;
}

export interface LeavePlace {
  leavePlace: LeavePlace_leavePlace;
}

export interface LeavePlaceVariables {
  placeId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemovePlace
// ====================================================

export interface RemovePlace {
  removeOnePlace: boolean;
}

export interface RemovePlaceVariables {
  placeId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: PlacesSubs
// ====================================================

export interface PlacesSubs_placesSubscription_data_joinedUsers {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface PlacesSubs_placesSubscription_data_owner {
  __typename: "User";
  id: string;
}

export interface PlacesSubs_placesSubscription_data {
  __typename: "Place";
  id: string;
  name: string;
  joinedUsers: PlacesSubs_placesSubscription_data_joinedUsers[] | null;
  owner: PlacesSubs_placesSubscription_data_owner;
}

export interface PlacesSubs_placesSubscription {
  __typename: "PlaceNotificationType";
  id: string;
  date: any;
  action: string;
  data: PlacesSubs_placesSubscription_data;
}

export interface PlacesSubs {
  placesSubscription: PlacesSubs_placesSubscription;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface FBLoginInput {
  fbId: string;
  name: string;
  accessToken: string;
  avatar?: string | null;
}

export interface NewPlaceInput {
  name: string;
}

export interface UpdatePlaceInput {
  id: string;
  joinedUserId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
