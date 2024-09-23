import { z } from "zod";

export const MAX_MESSAGE_LENGTH = 20;
export const MAX_USERNAME_LENGTH = 10;

export const GreetingSchema = z.object({
  message: z.string().max(MAX_MESSAGE_LENGTH),
  username: z.string().max(MAX_USERNAME_LENGTH),
  createdAt: z.date(),
});

export type Greeting = z.infer<typeof GreetingSchema>;

const greetings: Greeting[] = [];

export function getGreetings(): Greeting[] {
  return greetings.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

export function addGreeting(greeting: Greeting) {
  GreetingSchema.parse(greeting);

  greetings.push(greeting);
  return greeting;
}
