import { ObjectType, Field, ID } from "type-graphql";

export const CHAT_REDIS_STORE = "CHRS";

@ObjectType()
export class ChatMessage {
  @Field(() => ID)
  id!: string;

  @Field()
  timestamp!: Date;

  @Field()
  senderName!: string;

  @Field()
  message!: string;
}
