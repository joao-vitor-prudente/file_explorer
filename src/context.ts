import { S3Client, SQL } from "bun";

import { env, type Env } from "./env";

type AppContext = Readonly<{
  env: Env;
  s3: S3Client;
  sql: SQL;
}>;

export function createContext(): AppContext {
  const sql = new SQL(env.postgresUrl);
  const s3 = new S3Client({
    accessKeyId: env.s3AccessKeyId,
    bucket: env.s3Bucket,
    endpoint: env.s3Endpoint,
    secretAccessKey: env.s3SecretAccessKey,
  });

  return { env, s3, sql };
}
