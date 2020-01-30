import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

dotenv.config();

(async () => {
  await createConnection();

  const app = express();

  // middlewares
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL
    })
  );

  const port = process.env.PORT;
  app.listen(port, () =>
    console.log(`graphql server started on http://localhost:${port}/graphql`)
  );
})();
