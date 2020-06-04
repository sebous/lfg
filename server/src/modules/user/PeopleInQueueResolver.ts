import { Resolver, Query, Subscription, Root, Mutation, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { UserNotificationType } from "./types/UserNotification";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { ServerContext } from "../../types/context";

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

  // TODO: this should come from session
  // add to queue
  @Mutation(() => Boolean)
  async addUserToQueue(@Ctx() ctx: ServerContext) {
    const { userId } = ctx.req;
    if (!userId) return false;

    const user = await User.findOne(userId);
    if (!user) return false;

    user.queuing = true;
    await user.save();
    return true;
  }

  // remove from queue
  @Mutation(() => Boolean)
  async removeUserFromQueue(@Ctx() ctx: ServerContext) {
    const { userId } = ctx.req;
    if (!userId) return false;

    const user = await User.findOne(userId);
    if (!user) return false;

    user.queuing = false;
    await user.save();
    return true;
  }
}
