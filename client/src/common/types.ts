export interface User {
  username: string;
  userId: string;
  avatar?: string;
}

export interface Place {
  id: string;
  name: string;
  joinedUsersIds: string[];
}

export enum SubscriptionTopic {
  PLACE_ADDED = "PLACE_ADDED",
  USER_QUEUED = "USER_QUEUED",
}
