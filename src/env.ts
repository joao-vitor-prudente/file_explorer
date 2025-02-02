import { z } from "zod";

const envSchema = z.object({
  postgresUrl: z.string(),
  s3AccessKeyId: z.string(),
  s3Bucket: z.string(),
  s3Endpoint: z.string(),
  s3SecretAccessKey: z.string(),
});

export const env = envSchema.parse({
  postgresUrl: process.env["POSTGRES_URL"],
  s3AccessKeyId: process.env["S3_ACCESS_KEY_ID"],
  s3Bucket: process.env["S3_BUCKET"],
  s3Endpoint: process.env["S3_ENDPOINT"],
  s3SecretAccessKey: process.env["S3_SECRET_ACCESS_KEY"],
});

export type Env = z.infer<typeof envSchema>;
