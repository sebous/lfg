import { Resolver, Query, Subscription, Root, Mutation, Ctx, PubSub, PubSubEngine } from "type-graphql";
import { User } from "../../entity/User";
import { UserNotificationType } from "./types/UserNotification";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { ServerContext } from "../../types/context";
import { notificationFactory } from "../../common/factories";

@Resolver()
export class GetPeopleInQueue {
  // get users in queue
  @Query(() => [User])
  async getPeopleInQueue(): Promise<User[]> {
    const queuingUsers = await User.find({ where: { queuing: true } });
    return queuingUsers;
  }

  // subscribe changes in people queue
  @Subscription(() => UserNotificationType, {
    topics: [SubscriptionTopic.USER],
  })
  peopleQueueSubscription(@Root() payload: Notification<User>): UserNotificationType {
    return payload as UserNotificationType;
  }

  // add to queue
  @Mutation(() => Boolean)
  async queueSelf(@Ctx() ctx: ServerContext, @PubSub() pubSub: PubSubEngine) {
    const { userId } = ctx.req.session;
    if (!userId) return false;

    const user = await User.findOne(userId);
    if (!user) return false;

    user.queuing = true;
    const updatedUser = await user.save();

    await pubSub.publish(SubscriptionTopic.USER, notificationFactory<User>(updatedUser, "ADD"));
    return true;
  }

  // remove from queue
  @Mutation(() => Boolean)
  async leaveQueue(@Ctx() ctx: ServerContext, @PubSub() pubSub: PubSubEngine) {
    const { userId } = ctx.req.session;
    if (!userId) return false;

    const user = await User.findOne(userId);
    if (!user) return false;

    user.queuing = false;
    const updatedUser = await user.save();

    await pubSub.publish(SubscriptionTopic.USER, notificationFactory<User>(updatedUser, "DELETE"));
    return true;
  }
}
