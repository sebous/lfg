import { Resolver, Query } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class GetUsersInQueue {
  // find users in queue
  @Query(() => [User])
  async getUsersInQueue(): Promise<User[]> {
    const users = await User.find({ where: { queuing: true } });
    return users;
  }
}
