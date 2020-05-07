import { ObjectType, Field, ID, ClassType } from "type-graphql";

export enum NotificationPriority {
  NORMAL,
  HIGH,
}

export enum SubscriptionTopic {
  PLACE = "PLACE",
  USER = "USER",
  CHAT = "CHAT",
}

export type Action = "ADD" | "UPDATE" | "DELETE";

export interface Notification<T> {
  id: string;
  date: Date;
  action: Action;
  data: T;
}

export function NotificationType<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class NotificationTypeClass {
    @Field(() => ID)
    id!: string;

    @Field(() => Date)
    date!: Date;

    @Field()
    action!: Action;

    @Field(() => TClass)
    data!: T;
  }
  return NotificationTypeClass;
}
