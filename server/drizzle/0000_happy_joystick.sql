CREATE TABLE IF NOT EXISTS "greeting" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar(256) NOT NULL,
	"author" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"displayed_until" timestamp NOT NULL,
	"video" varchar NOT NULL
);
