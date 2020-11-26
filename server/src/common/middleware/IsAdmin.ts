import { MiddlewareFn } from "type-graphql";
import { ServerContext } from "../../types/context";

export const IsAdmin: MiddlewareFn<ServerContext> = async ({ context }, next) => {
  const code = context.req.header("Access-Code");
  console.log(typeof code, typeof process.env.ACCESS_CODE);
  if (!code || code !== process.env.ACCESS_CODE) {
    const err = new Error("access denied");
    err.stack = undefined;
    throw err;
  }
  return next();
};
