import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import * as path from "path";
import http from "http";
import { ApolloServer, CorsOptions } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { applyMiddlewares } from "./common/middleware";
import { pubSubRedis } from "./common/redis";
import { scheduleCronJobs } from "./common/cronjobs";
import { createTypeormConn } from "./common/dbConnection";
import { GraphQLAuthChecker, routeAuthChecker } from "./modules/user/AuthChecker";

dotenv.config();

(async () => {
  try {
    // TypeORM + TypeGraphQL config
    console.log("beforeCreateTypeormConn");
    await createTypeormConn();
    const schema = await buildSchema({
      resolvers: [path.join(__dirname, "/modules/**/*.{ts,js}")],
      pubSub: pubSubRedis,
      authChecker: GraphQLAuthChecker,
    });

    // cronjobs
    if (process.env.NODE_ENV === "production") scheduleCronJobs();

    // apollo config
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req }),
      subscriptions: {
        onConnect: () => console.log("client subscribed"),
        onDisconnect: () => console.log("client disconnected"),
        path: "/subscriptions",
      },
      uploads: false,
    });

    // express config
    const app = express();

    // cors
    const corsOptions: cors.CorsOptions = {
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

    app.use("/uploads", routeAuthChecker, express.static(path.join(__dirname, "../uploads")));

    const PORT = 4000;
    httpServer.listen(PORT, () => console.log(`graphql server started on http://localhost:${PORT}/graphql`));
  } catch (err) {
    console.log(err);
  }
})();
