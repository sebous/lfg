/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetChatHistory
// ====================================================

export interface GetChatHistory_getChatHistory {
  id: string;
  timestamp: string;
  senderName: string;
  message: string;
}

export interface GetChatHistory {
  getChatHistory: GetChatHistory_getChatHistory[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendChatMessage
// ====================================================

export interface SendChatMessage {
  sendChatMessage: boolean;
}

export interface SendChatMessageVariables {
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ChatSubscription
// ====================================================

export interface ChatSubscription_chatSubscription {
  id: string;
  timestamp: string;
  senderName: string;
  message: string;
}

export interface ChatSubscription {
  chatSubscription: ChatSubscription_chatSubscription;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginViaCookie
// ====================================================

export interface LoginViaCookie_loginViaCookie {
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
  id: string;
  username: string;
}

export interface peopleQueueSubscription_peopleQueueSubscription {
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
// GraphQL mutation operation: QueueSelf
// ====================================================

export interface QueueSelf {
  queueSelf: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LeaveQueue
// ====================================================

export interface LeaveQueue {
  leaveQueue: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaces
// ====================================================

export interface GetPlaces_getPlaces_joinedUsers {
  id: string;
  username: string;
  avatar: string | null;
}

export interface GetPlaces_getPlaces_owner {
  id: string;
}

export interface GetPlaces_getPlaces {
  id: string;
  name: string;
  description: string | null;
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
  id: string;
  name: string;
  description: string | null;
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
// GraphQL mutation operation: JoinPlace
// ====================================================

export interface JoinPlace_joinPlace_joinedUsers {
  id: string;
  username: string;
  avatar: string | null;
}

export interface JoinPlace_joinPlace_owner {
  id: string;
}

export interface JoinPlace_joinPlace {
  id: string;
  name: string;
  description: string | null;
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
  id: string;
  username: string;
  avatar: string | null;
}

export interface LeavePlace_leavePlace_owner {
  id: string;
}

export interface LeavePlace_leavePlace {
  id: string;
  name: string;
  description: string | null;
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
  id: string;
  username: string;
  avatar: string | null;
}

export interface PlacesSubs_placesSubscription_data_owner {
  id: string;
}

export interface PlacesSubs_placesSubscription_data {
  id: string;
  name: string;
  description: string | null;
  joinedUsers: PlacesSubs_placesSubscription_data_joinedUsers[] | null;
  owner: PlacesSubs_placesSubscription_data_owner;
}

export interface PlacesSubs_placesSubscription {
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
  description: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
