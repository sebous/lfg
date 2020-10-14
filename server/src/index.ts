import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer, CorsOptions } from "apollo-server-express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { applyMiddlewares } from "./common/middleware";
import { pubSubRedis } from "./common/redis";
import { scheduleCronJobs } from "./common/cronjobs";
import { createTypeormConn } from "./common/dbConnection";
import { router } from "./routes";

dotenv.config();

(async () => {
  try {
    // TypeORM
    await createTypeormConn();

    // cronjobs
    if (process.env.NODE_ENV === "production") scheduleCronJobs();

    // express config
    const app = express();

    app.get("/", (req, res) => {
      res.send("lala");
    });

    // cors
    const corsOptions: cors.CorsOptions = {
      // TODO: limit this in production
      origin: true,
      credentials: true,
    };
    app.use(cors(corsOptions));

    // middlewares
    applyMiddlewares(app);

    // routes
    app.use("/api", router);

    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
