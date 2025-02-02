import { sql } from "./config";

export async function createTriggers(): Promise<void> {
  await sql`
    CREATE OR REPLACE FUNCTION hash_password_before_insert_or_update()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.password IS DISTINCT FROM OLD.password THEN
        NEW.password = crypt(NEW.password, gen_salt('bf'));
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

  await sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `;
}

export async function dropTriggers(): Promise<void> {
  await sql`DROP FUNCTION IF EXISTS hash_password_before_insert_or_update`;

  await sql`DROP FUNCTION IF EXISTS update_updated_at_column`;
}
