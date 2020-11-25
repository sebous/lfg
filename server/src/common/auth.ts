import jwt from "jsonwebtoken";
import { HEADER_ACCESS_TOKEN } from "../constants/headers";
import { User } from "../entity/User";
import { ServerContext } from "../types/context";

interface Payload {
  userId: string;
}

export function createAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
}

export function createRefreshToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
}

export function verifyAccessToken(token: string) {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function refreshAccessToken(token: string) {
  try {
    const payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    const { userId } = payload as Payload;

    const user = await User.findOne(userId);
    if (!user) throw Error("invalid refresh token");

    const accessToken = createAccessToken(user);
    return accessToken;
  } catch (err) {
    console.log(err);
  }
}

export async function decodeAndValidateAccessToken(token: string) {
  try {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    return payload as Payload;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserIdFromContext(ctx: ServerContext) {
  try {
    const accessToken = ctx.req.header(HEADER_ACCESS_TOKEN);
    if (!accessToken) return;

    const payload = jwt.decode(accessToken);
    const { userId } = payload as Payload;
    return userId;
  } catch (err) {
    console.log(err);
  }
}
