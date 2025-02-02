import { sql } from "../config";

export async function createTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `;

  await sql`
    CREATE TRIGGER hash_password_trigger
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION hash_password_before_insert_or_update();
  `;
}

export async function dropTable(): Promise<void> {
  await sql`DROP TRIGGER IF EXISTS update_updated_at_column on users`;

  await sql`DROP TRIGGER IF EXISTS hash_password_before_insert_or_update on users`;

  await sql`DROP TABLE IF EXISTS users`;
}
