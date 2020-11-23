import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";
import { FBLoginInput } from "./types/FBLoginInput";
import { checkIfTokenValid } from "../../common/util/fbUtils";
import { redis } from "../../common/redis";
import { LoginResponse } from "./types/LoginResponse";
import * as auth from "../../common/auth";

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

  @Query(() => User, { nullable: true })
  async checkToken(@Ctx() ctx: ServerContext): Promise<User | undefined> {
    const token = ctx.req.header("authorization");
    if (!token) return;

    const userId = await auth.decodeAndValidate(token);
    if (!userId) return;

    const user = await User.findOne(userId);
    if (!user) return;

    return user;
  }

  // FB login
  @Mutation(() => LoginResponse, { nullable: true })
  async FBlogin(@Arg("input") { fbId, name, avatar, accessToken }: FBLoginInput): Promise<LoginResponse | undefined> {
    const user = await User.findOne({ where: { fbId } });

    // register user
    if (!user) {
      const newUser = await User.create({
        username: name,
        name,
        fbId,
        avatar,
      }).save();

      const token = auth.createToken(newUser.id);
      return { user: newUser, token };
    }

    // login existing user

    // also refresh avatar url from fb
    if (user.avatar !== avatar) {
      user.avatar = avatar;
      await user.save();
    }

    const token = auth.createToken(user.id);
    return { user, token };
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
