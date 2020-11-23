import { Resolver, Mutation, Arg, Ctx, Query, Authorized } from "type-graphql";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";
import { FBLoginInput } from "./types/FBLoginInput";
import { checkIfTokenValid } from "../../common/util/fbUtils";
import { redis } from "../../common/redis";

@Resolver()
export class LoginResolver {
  // login with existing cookie
  @Query(() => User, { nullable: true })
  async loginViaCookie(@Ctx() ctx: ServerContext): Promise<User | undefined> {
    console.log("loginViaCookie", ctx.req.session!);
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
      const newUser = await User.create({
        username: name,
        name,
        fbId,
        avatar,
      }).save();

      console.log("user registered", newUser.id);

      ctx.req.session!.userId = newUser.id;
      return newUser;
    }

    console.log("logging existing user");

    await redis.set("A", "B");
    const a = await redis.get("A");
    console.log("REDIS", a);

    // login existing user
    ctx.req.session!.userId = user.id;

    // also refresh avatar url from fb
    if (user.avatar !== avatar) {
      user.avatar = avatar;
      await user.save();
    }
    return user;
  }

  // login user - no registration
  //   @Mutation(() => User)
  //   async dummyLogin(
  //     @Arg("username") username: string,
  //     @Ctx() ctx: ServerContext,
  //     @PubSub() pubSub: PubSubEngine
  //   ): Promise<User> {
  //     const newUser = await User.create({ username, queuing: true }).save();
  //     console.log(newUser);

  //     // add userId to session, not used for now
  //     // ctx.req.session!.userId = newUser.id;

  //     // TODO: call subscription here -> add to queue
  //     const notification = notificationFactory<User>(newUser, "ADD");
  //     await pubSub.publish(SubscriptionTopic.USER_QUEUED, notification);
  //     return newUser;
  //   }
}
