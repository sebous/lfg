import { Resolver, Query, Mutation, Arg, Ctx, PubSub, PubSubEngine, Subscription, Root } from "type-graphql";
import { ChatMessage, CHAT_REDIS_STORE } from "../../types/chat";
import { redis } from "../../common/redis";
import { ServerContext } from "../../types/context";
import { User } from "../../entity/User";
import { chatMessageFactory } from "../../common/factories";
import { SubscriptionTopic } from "../../types/notifications";
import { clearChat } from "../../common/chatUtils";

@Resolver()
export class ChatResolver {
  // get latest chat history
  @Query(() => [ChatMessage])
  async getChatHistory(): Promise<ChatMessage[]> {
    const messages: string[] | null = await redis.lrange(CHAT_REDIS_STORE, 0, 20);
    if (!messages) return [];
    return messages.map(json => JSON.parse(json)).reverse();
  }

  // send message
  @Mutation(() => Boolean)
  async sendChatMessage(
    @Arg("message") message: string,
    @Ctx() ctx: ServerContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const user = await User.findOne(ctx.req.session!.userId);
    if (!user) throw Error("invalid session");

    const chatMessage = chatMessageFactory(message, user.name ?? "");
    await redis.lpush(CHAT_REDIS_STORE, JSON.stringify(chatMessage));
    await pubSub.publish(SubscriptionTopic.CHAT, chatMessage);
    return true;
  }

  // subscribe to new messages
  @Subscription(() => ChatMessage, { topics: [SubscriptionTopic.CHAT] })
  chatSubscription(@Root() payload: ChatMessage) {
    return payload;
  }

  // TODO: this should require admin priviledges
  @Mutation(() => Boolean)
  async clearChatMessages() {
    await clearChat();
    return true;
  }
}
