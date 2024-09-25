import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./server/db/connection";

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./server/drizzle",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: dbUrl,
  },
});
