import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  PubSub,
  PubSubEngine,
  Subscription,
  Root,
} from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types/context";
import { notificationFactory } from "../../common/factories";
import { SubscriptionTopic, Notification } from "../../types/notifications";
import { UserNotificationType } from "./UserNotification";

@Resolver()
export class LoginResolver {
  // login user - no registration
  @Mutation(() => User)
  async dummyLogin(
    @Arg("username") username: string,
    @Ctx() ctx: Context,
    @PubSub() pubSub: PubSubEngine
  ): Promise<User> {
    const newUser = await User.create({ username }).save();
    console.log(newUser);

    // add userId to session, not used for now
    // ctx.req.session!.userId = newUser.id;

    // TODO: call subscription here -> add to queue
    const notification = notificationFactory<User>(newUser);
    await pubSub.publish(SubscriptionTopic.USER_QUEUED, notification);
    return newUser;
  }

  @Query(() => String)
  async helloWorld() {
    return "Hello world";
  }

  // subscribe to user queue
  @Subscription(() => UserNotificationType, {
    topics: SubscriptionTopic.USER_QUEUED,
  })
  userQueueSubscription(
    @Root() payload: Notification<User>
  ): UserNotificationType {
    return payload as UserNotificationType;
  }
}
