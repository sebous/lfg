import { getConnectionOptions, createConnection, ConnectionOptions } from "typeorm";

export const createTypeormConn = async () => {
  console.log("createTypeormConn");
  const connectionOpts = await getConnectionOptions(process.env.NODE_ENV);
  console.log("connectionOpts", connectionOpts);
  const opts: ConnectionOptions = { ...connectionOpts, name: "default" };
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...opts,
        url: process.env.DATABASE_URL,
      } as any)
    : createConnection({ ...opts });
};
