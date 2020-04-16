export interface User {
  username: string;
  id: string;
  avatar?: string;
}

export interface Place {
  id: string;
  name: string;
  joinedUsersIds: string[];
  createdBy?: User;
}

export enum SubscriptionTopic {
  PLACE_ADDED = "PLACE_ADDED",
  USER_QUEUED = "USER_QUEUED",
}

export enum Action {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
