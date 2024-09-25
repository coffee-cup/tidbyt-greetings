import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { dbUrl } from "./connection";

export * from "./schema";

const queryClient = postgres(dbUrl);
export const db = drizzle(queryClient);
