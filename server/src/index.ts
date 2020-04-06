import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import http from "http";
import session from "express-session";
import connectRedis from "connect-redis";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";

dotenv.config();

(async () => {
  try {
    await createConnection();
    const schema = await buildSchema({
      resolvers: [__dirname + "/modules/**/*.ts"],
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

    // middlewares
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
    httpServer.listen(port, () =>
      console.log(`graphql server started on http://localhost:${port}/graphql`)
    );
  } catch (err) {
    console.log(err);
  }
})();
