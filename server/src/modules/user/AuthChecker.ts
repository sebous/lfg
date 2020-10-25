import { AuthChecker } from "type-graphql";
import { User } from "../../entity/User";
import { ServerContext } from "../../types/context";

export const ServerAuthChecker: AuthChecker<ServerContext> = async ({ context }) => {
  const user = await User.findOne({ where: { id: context.req.session.userId } });
  if (!user) return false;
  return true;
};
