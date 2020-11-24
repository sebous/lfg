import { Express } from "express";
import * as auth from "./auth";

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

  app.post("/refresh_token", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(500);

    const accessToken = auth.refreshAccessToken(refreshToken);
    if (!accessToken) return res.status(500);

    return res.send({ ok: true, access_token: accessToken });
  });
}
