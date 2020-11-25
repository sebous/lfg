import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
  console.log("createTypeormConn");
  const connectionOpts = await getConnectionOptions(process.env.NODE_ENV);
  console.log("connectionOpts", connectionOpts);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOpts,
        url: process.env.DATABASE_URL,
      } as any)
    : createConnection({ ...connectionOpts });
};
