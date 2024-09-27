import { desc, sql } from "drizzle-orm";
import { db, greeting, type InsertGreeting } from "./db";
import dayjs from "dayjs";

export const getDisplayedUntil = () => dayjs().add(10, "minutes").toDate();

export async function getGreetings() {
  const res = await db
    .select()
    .from(greeting)
    .orderBy(desc(greeting.createdAt));

  return res;
}

export async function getCurrentlyDisplayedGreeting() {
  const res = await db
    .select()
    .from(greeting)
    .where(sql`${greeting.displayedUntil} > ${dayjs().toISOString()}`)
    .limit(1);

  return res[0];
}

export async function addGreeting(
  data: Omit<InsertGreeting, "displayedUntil">,
) {
  const currentlyDisplayedGreeting = await getCurrentlyDisplayedGreeting();

  if (currentlyDisplayedGreeting) {
    throw new Error("There is already a greeting displayed");
  }

  const displayedUntil = getDisplayedUntil();

  const [insertedRow] = await db
    .insert(greeting)
    .values({ ...data, displayedUntil })
    .returning();

  return insertedRow;
}
