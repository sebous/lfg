import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import * as path from "path";
import { createConnection } from "typeorm";
import http from "http";
import { ApolloServer, CorsOptions } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { applyMiddlewares } from "./common/middleware";
import { pubSubRedis } from "./common/redis";

dotenv.config();

(async () => {
  try {
    // TypeORM + TypeGraphQL config
    await createConnection();
    const schema = await buildSchema({
      resolvers: [path.join(__dirname, "/modules/**/*.ts")],
      pubSub: pubSubRedis,
    });

    // apollo config
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req }),
      subscriptions: {
        onConnect: () => console.log("client subscribed"),
        onDisconnect: () => console.log("client disconnected"),
        path: "/subscriptions",
      },
    });

    // express config
    const app = express();

    // cors
    const corsOptions: cors.CorsOptions = {
      // TODO: limit this in production
      origin: true,
      credentials: true,
    };
    app.use(cors(corsOptions));

    // middlewares
    applyMiddlewares(app);

    // server init
    apolloServer.applyMiddleware({ app, cors: corsOptions as CorsOptions });

    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const { PORT } = process.env;
    httpServer.listen(PORT, () => console.log(`graphql server started on http://localhost:${PORT}/graphql`));
  } catch (err) {
    console.log(err);
  }
})();
