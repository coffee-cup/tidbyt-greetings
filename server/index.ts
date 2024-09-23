import { Elysia, t } from "elysia";
import {
  addGreeting,
  getGreetings,
  MAX_MESSAGE_LENGTH,
  MAX_USERNAME_LENGTH,
} from "./greetings";

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
        username: body.username,
        createdAt: new Date(),
      });

      return greeting;
    },
    {
      body: t.Object({
        message: t.String({ maxLength: MAX_MESSAGE_LENGTH }),
        username: t.String({ maxLength: MAX_USERNAME_LENGTH }),
      }),
    },
  )
  .listen({ port, hostname }, ({ hostname, port }) => {
    console.log(`Server is running on ${hostname}:${port}`);
  });
