import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { dbUrl } from "./connection";
import { sql } from "drizzle-orm";

const migrationClient = postgres(dbUrl, { max: 1 });

console.log("starting migration");

await migrate(drizzle(migrationClient), {
  migrationsFolder: "./server/drizzle",
});

await migrationClient.end();

console.log("migration complete");
