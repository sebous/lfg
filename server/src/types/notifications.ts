import { ObjectType, Field, ID, ClassType } from "type-graphql";

export enum NotificationPriority {
  NORMAL,
  HIGH,
}

export enum SubscriptionTopic {
  PLACE_ADDED = "PLACE_ADDED",
  USER_QUEUED = "USER_QUEUED",
}

export interface Notification<T> {
  id: string;
  date: Date;
  data: T;
}

export function NotificationType<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class NotificationTypeClass {
    @Field(() => ID)
    id!: string;

    @Field(() => Date)
    date!: Date;

    @Field(() => TClass)
    data!: T;
  }
  return NotificationTypeClass;
}
