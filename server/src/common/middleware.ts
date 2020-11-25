import { Express, json } from "express";
import { graphqlUploadExpress } from "graphql-upload";

import * as auth from "./auth";

export function applyMiddlewares(app: Express) {
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10, maxFieldSize: 10000000 }));
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
  app.use(json());
  app.post("/refresh_token", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    const accessToken = await auth.refreshAccessToken(refreshToken);
    if (!accessToken) return res.sendStatus(401);

    return res.send({ ok: true, access_token: accessToken });
  });
}
