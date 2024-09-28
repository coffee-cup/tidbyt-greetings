import { type InferSelectModel } from "drizzle-orm";
import {
  customType,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const greeting = pgTable("greeting", {
  id: serial("id").primaryKey(),
  message: varchar("message", { length: 256 }).notNull(),
  author: varchar("author", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  displayedUntil: timestamp("displayed_until").notNull(),
  video: varchar("video").notNull(),
});

export const MAX_MESSAGE_LENGTH = 20;
export const MAX_AUTHOR_LENGTH = 10;

export const insertGreetingSchema = createInsertSchema(greeting, {
  createdAt: z.never(),
  message: z.string().max(MAX_MESSAGE_LENGTH),
  author: z.string().max(MAX_AUTHOR_LENGTH),
});
export type InsertGreeting = z.infer<typeof insertGreetingSchema>;

export type Greeting = InferSelectModel<typeof greeting>;
