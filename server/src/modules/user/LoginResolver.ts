import { Resolver, Mutation, Arg, Ctx, PubSub, PubSubEngine, Query } from "type-graphql";
import { notificationFactory } from "../../common/factories";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";
import { SubscriptionTopic } from "../../types/notifications";
import { FBLoginInput } from "./types/FBLoginInput";
import { checkIfTokenValid } from "../../common/util/fbUtils";

@Resolver()
export class LoginResolver {
  // login with existing cookie
  @Query(() => User, { nullable: true })
  async loginViaCookie(@Ctx() ctx: ServerContext): Promise<User | undefined> {
    // user not in session
    if (!ctx.req.session!.userId) return;

    // user no longer exists
    const user = await User.findOne(ctx.req.session!.userId);
    if (!user) return;

    return user;
  }

  // FB login
  @Mutation(() => User, { nullable: true })
  async FBlogin(
    @Arg("input") { fbId, name, avatar, accessToken }: FBLoginInput,
    @Ctx() ctx: ServerContext
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { fbId } });

    // register user
    if (!user) {
      const FBtokenValid = await checkIfTokenValid(accessToken);
      if (!FBtokenValid) return;

      const newUser = await User.create({
        username: name,
        name,
        fbId,
        avatar,
      }).save();

      ctx.req.session!.userId = newUser.id;
      return newUser;
    }

    // login existing user
    ctx.req.session!.userId = user.id;
    return user;
  }

  // login user - no registration
  @Mutation(() => User)
  async dummyLogin(
    @Arg("username") username: string,
    @Ctx() ctx: ServerContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<User> {
    const newUser = await User.create({ username, queuing: true }).save();
    console.log(newUser);

    // add userId to session, not used for now
    // ctx.req.session!.userId = newUser.id;

    // TODO: call subscription here -> add to queue
    const notification = notificationFactory<User>(newUser, "ADD");
    await pubSub.publish(SubscriptionTopic.USER_QUEUED, notification);
    return newUser;
  }
}
