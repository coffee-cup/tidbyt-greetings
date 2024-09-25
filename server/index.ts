import { Elysia, t } from "elysia";
import { addGreeting, getGreetings } from "./greetings";
import { MAX_MESSAGE_LENGTH, MAX_AUTHOR_LENGTH } from "./db";

const port = 4000;
const hostname = "0.0.0.0";

new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/hello", "Do you miss me?")
  .get("/greetings", () => {
    return getGreetings();
  })
  .post(
    "/greeting",
    ({ body }) => {
      const greeting = addGreeting({
        message: body.message,
        author: body.author,
      });

      return greeting;
    },
    {
      body: t.Object({
        message: t.String({ maxLength: MAX_MESSAGE_LENGTH }),
        author: t.String({ maxLength: MAX_AUTHOR_LENGTH }),
      }),
    },
  )
  .listen({ port, hostname }, ({ hostname, port }) => {
    console.log(`Server is running on ${hostname}:${port}`);
  });
