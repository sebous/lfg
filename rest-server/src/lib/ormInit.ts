import { MikroORM } from "@mikro-orm/core";

const orm = MikroORM.init({
  entities: ["./dist/entity/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
});
