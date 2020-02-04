import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types/context";

@Resolver()
export class LoginResolver {
  // login user - no registration
  @Mutation(() => User)
  async dummyLogin(
    @Arg("username") username: string,
    @Ctx() ctx: Context
  ): Promise<User> {
    const newUser = await User.create({ username }).save();
    console.log(newUser);

    // add userId to session, not used for now
    // ctx.req.session!.userId = newUser.id;

    // TODO: call subscription here -> add to queue
    return newUser;
  }

  @Query(() => String)
  async helloWorld(): Promise<string> {
    return "Hello World!";
  }
}
