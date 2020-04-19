import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import * as path from "path";
import { createConnection } from "typeorm";
import http from "http";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";

import { redis } from "./common/redis";

dotenv.config();

(async () => {
  try {
    await createConnection();
    const schema = await buildSchema({
      resolvers: [path.join(__dirname, "/modules/**/*.ts")],
    });

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req }),
      subscriptions: {
        onConnect: () => console.log("client subscribed"),
        onDisconnect: () => console.log("client disconnected"),
        path: "/subscriptions",
      },
    });

    const app = express();

    const RedisStore = connectRedis(session);

    // middlewares
    app.use(
      session({
        store: new RedisStore({
          client: redis as any,
        }),
        name: "qid",
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

    app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      })
    );

    apolloServer.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const port = process.env.PORT;
    httpServer.listen(port, () => console.log(`graphql server started on http://localhost:${port}/graphql`));
  } catch (err) {
    console.log(err);
  }
})();
