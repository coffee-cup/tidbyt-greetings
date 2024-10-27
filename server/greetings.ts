import { desc, sql } from "drizzle-orm";
import { db, greeting, type InsertGreeting } from "./db";
import dayjs from "dayjs";
import { generate } from "./tidbyt/generate";

const NUM_MINUTES_TO_DISPLAY = 5;

export const getDisplayedUntil = () =>
  dayjs().add(NUM_MINUTES_TO_DISPLAY, "minutes").toDate();

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
    .orderBy(desc(greeting.createdAt))
    .limit(1);

  if (res.length === 0) {
    return null;
  }

  return res[0];
}

export async function addGreeting(
  data: Omit<InsertGreeting, "displayedUntil" | "video">,
  force: boolean = false,
) {
  const currentlyDisplayedGreeting = await getCurrentlyDisplayedGreeting();

  if (currentlyDisplayedGreeting && !force) {
    throw new Error("There is already a greeting displayed");
  }

  const video = await generate(data);

  const displayedUntil = getDisplayedUntil();

  const base64Video = Buffer.from(video).toString("base64");

  const [insertedRow] = await db
    .insert(greeting)
    .values({ ...data, displayedUntil, video: base64Video })
    .returning();

  return insertedRow;
}
