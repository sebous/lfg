import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";
import { FBLoginInput } from "./types/FBLoginInput";
import { checkIfTokenValid } from "../../common/util/fbUtils";
import { redis } from "../../common/redis";
import { LoginResponse } from "./types/LoginResponse";
import * as auth from "../../common/auth";
import { HEADER_ACCESS_TOKEN } from "../../constants/headers";

@Resolver()
export class LoginResolver {
  // login with existing cookie
  // @Query(() => User, { nullable: true })
  // async loginViaCookie(@Ctx() ctx: ServerContext): Promise<User | undefined> {
  //   console.log("loginViaCookie", ctx.req.session!);
  //   const user = await User.findOne(ctx.req.session!.userId);
  //   if (!user) return;

  //   return user;
  // }

  @Query(() => User, { nullable: true })
  async checkToken(@Ctx() ctx: ServerContext): Promise<User | undefined> {
    const token = ctx.req.header(HEADER_ACCESS_TOKEN);
    if (!token) return;

    const payload = await auth.decodeAndValidateAccessToken(token);
    if (!payload) return;

    const user = await User.findOne(payload.userId);
    if (!user) return;

    return user;
  }

  // FB login
  @Mutation(() => LoginResponse, { nullable: true })
  async FBlogin(@Arg("input") { fbId, name, avatar }: FBLoginInput): Promise<LoginResponse | undefined> {
    let user = await User.findOne({ where: { fbId } });

    // new user
    if (!user) {
      user = await User.create({
        username: name,
        name,
        fbId,
        avatar,
      }).save();
    }

    // try to refresh avatar for existing user
    if (user.avatar !== avatar) {
      user.avatar = avatar;
      await user.save();
    }

    const accessToken = auth.createAccessToken(user);
    const refreshToken = auth.createRefreshToken(user);
    return { user, accessToken, refreshToken };
  }
}
