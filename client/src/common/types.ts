export interface User {
  username: string;
  userId: string;
  avatar?: string;
}

export interface Place {
  id: string;
  name: string;
  peopleJoined: string[];
}
