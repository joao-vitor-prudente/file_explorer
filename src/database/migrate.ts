import { argv } from "bun";
import { parseArgs } from "util";
import { z } from "zod";

import { createExtensions, dropExtensions } from "./extensions";
import * as tables from "./tables";
import { createTriggers, dropTriggers } from "./triggers";

enum MigrationOperation {
  down = "down",
  up = "up",
}

function getMigrationOperation(): MigrationOperation {
  const args = parseArgs({ allowPositionals: true, args: argv });

  const migrationOperationPosition = -1;
  const migrationOperationRaw = args.positionals.at(migrationOperationPosition);

  const migrationOperationSchema = z.enum([
    MigrationOperation.up,
    MigrationOperation.down,
  ]);

  return migrationOperationSchema.parse(migrationOperationRaw);
}

async function migrateDown(): Promise<void> {
  await tables.users.dropTable();
  await dropTriggers();
  await dropExtensions();
}

async function migrateUp(): Promise<void> {
  await createExtensions();
  await createTriggers();
  await tables.users.createTable();
}

const operation = getMigrationOperation();

switch (operation) {
  case MigrationOperation.down:
    console.log("Migrating down...");
    await migrateDown();
    console.log("Migrated down successfully!");
    break;
  case MigrationOperation.up:
    console.log("Migrating up...");
    await migrateUp();
    console.log("Migrated up successfully!");
    break;
}
