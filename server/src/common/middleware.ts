import session from "express-session";
import connectRedis from "connect-redis";
import { Express } from "express";
import { redis } from "./redis";

export function applyMiddlewares(app: Express) {
  // session
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "sess",
      secret: process.env.SESSION_SECRET || "qwerty",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );
}
