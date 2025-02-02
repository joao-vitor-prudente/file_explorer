import { sql } from "./config";

export async function createExtensions(): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
}

export async function dropExtensions(): Promise<void> {
  await sql`DROP EXTENSION IF EXISTS pgcrypto`;
}
