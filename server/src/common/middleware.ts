import session from "express-session";
import connectRedis from "connect-redis";
import { Express, Request, Response, NextFunction } from "express";
import { redis } from "./redis";
import { User } from "../entity/User";

export function applyMiddlewares(app: Express) {
  // session
  // const RedisStore = connectRedis(session);
  // app.use(
  //   session({
  //     // store: new RedisStore({
  //     //   client: redis as any,
  //     // }),
  //     name: "sess",
  //     secret: process.env.SESSION_SECRET || "qwerty",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       // 1 week
  //       maxAge: 1000 * 60 * 60 * 24 * 7,
  //     },
  //   })
  // );
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const user = await User.findOne({ where: { id: req.session!.userId } });
  if (!user) return res.sendStatus(401);

  next();
}
