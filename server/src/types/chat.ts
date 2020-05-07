import { ObjectType, Field, ID } from "type-graphql";

export const CHAT_REDIS_STORE = "CHRS";

@ObjectType()
export class ChatMessage {
  @Field(() => ID)
  id!: string;

  @Field()
  // string because of redis limitations
  timestamp!: string;

  @Field()
  senderName!: string;

  @Field()
  message!: string;
}
