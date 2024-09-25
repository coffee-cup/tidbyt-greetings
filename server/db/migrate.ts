import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { dbUrl } from "./connection";

const migrationClient = postgres(dbUrl, { max: 1 });

console.log("starting migration");

await migrate(drizzle(migrationClient), {
  migrationsFolder: "./server/drizzle",
});

await migrationClient.end();

console.log("migration complete");
