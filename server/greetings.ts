import { desc } from "drizzle-orm";
import { db, greeting, type InsertGreeting } from "./db";

export async function getGreetings() {
  const res = await db
    .select()
    .from(greeting)
    .orderBy(desc(greeting.createdAt));

  return res;
}

export async function addGreeting(data: InsertGreeting) {
  await db.insert(greeting).values(data);

  return data;
}
