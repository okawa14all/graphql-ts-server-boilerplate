import { createConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConn = async () => {
  const connentionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connentionOptions, name: "default" });
}