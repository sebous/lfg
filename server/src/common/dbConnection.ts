import { getConnectionOptions, createConnection, ConnectionOptions } from "typeorm";

export const createTypeormConn = async () => {
  const connectionOpts = await getConnectionOptions(process.env.NODE_ENV);
  const opts: ConnectionOptions = { ...connectionOpts, name: "default" };
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...opts,
        url: process.env.DATABASE_URL,
      } as any)
    : createConnection({ ...opts });
};
