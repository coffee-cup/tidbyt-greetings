CREATE TABLE IF NOT EXISTS "greeting" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar(256),
	"author" varchar(256),
	"created_at" timestamp DEFAULT now()
);
