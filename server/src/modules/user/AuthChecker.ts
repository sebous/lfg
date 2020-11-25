import { NextFunction, Request, Response } from "express";
import { AuthChecker } from "type-graphql";
import * as auth from "../../common/auth";
import { HEADER_ACCESS_TOKEN } from "../../constants/headers";
import { ServerContext } from "../../types/context";

// function verifyAuthHeader(req: Request) {
//   const accessToken = req.header(HEADER_ACCESS_TOKEN);
//   // console.log("accessToken", accessToken);
//   if (!accessToken) return false;
//   return auth.verifyAccessToken(accessToken);
// }

export const GraphQLAuthChecker: AuthChecker<ServerContext> = async ({ context }) => {
  const accessToken = context.req.header(HEADER_ACCESS_TOKEN);
  if (!accessToken) return false;

  return auth.verifyAccessToken(accessToken);
};

export async function routeAuthChecker(req: Request, res: Response, next: NextFunction) {
  console.log("logging");
  const accessToken = req.query[HEADER_ACCESS_TOKEN];

  if (!accessToken || !auth.verifyAccessToken(accessToken as string)) {
    console.log("401: bad token on /uploads", req.path);
    return res.sendStatus(401);
  }
  console.log("success");
  next();
}
