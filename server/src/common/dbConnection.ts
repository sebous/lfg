import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOpts = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOpts,
        url: process.env.DATABASE_URL,
        name: "default",
      } as any)
    : createConnection({ ...connectionOpts, name: "default" });
};
