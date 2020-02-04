import { ObjectType, Field, ID } from "type-graphql";

export interface NotificationPayload {
  data: string;
}

@ObjectType()
export class Notification {
  @Field(() => ID)
  id!: string;

  @Field(() => Date)
  date!: Date;

  @Field()
  data!: string;
}
