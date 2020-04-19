import { Resolver, Mutation, Arg, Ctx, PubSub, PubSubEngine } from "type-graphql";
import { notificationFactory } from "../../common/factories";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";
import { SubscriptionTopic } from "../../types/notifications";
import { FBLoginInput } from "./types/FBLoginInput";
import { checkIfTokenValid } from "../../common/fbUtils";

@Resolver()
export class LoginResolver {
  // @Mutation(() => User)
  // async login(@Arg("email") email: string, @Arg("password") password: string): Promise<User | undefined> {
  //   const user = await User.findOne({ where: { email } });
  // const hashedPassword = await bcrypt
  // }

  // FB login
  @Mutation(() => User, { nullable: true })
  async FBlogin(
    @Arg("input") { fbId, name, avatar, accessToken }: FBLoginInput,
    @Ctx() ctx: ServerContext
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { fbId } });

    // if not found register user
    if (!user) {
      const FBtokenValid = await checkIfTokenValid(accessToken);
      if (!FBtokenValid) return;

      const newUser = await User.create({
        username: name,
        name,
        fbId,
        avatar,
      }).save();

      // login user
      ctx.req.session!.userId = newUser.id;
      return newUser;
    }

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
