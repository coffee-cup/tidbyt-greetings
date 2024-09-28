import { Elysia, t } from "elysia";
import { MAX_AUTHOR_LENGTH, MAX_MESSAGE_LENGTH } from "./db";
import {
  addGreeting,
  getCurrentlyDisplayedGreeting,
  getGreetings,
} from "./greetings";
import { getLatestRenderFile } from "./tidbyt/generate";

const port = 4000;
const hostname = "0.0.0.0";

new Elysia()
  .get("/", () => "Tidbyt Message Board")
  .get("/hello", "hi")
  .get("/greetings", () => {
    return getGreetings();
  })
  .post(
    "/greeting",
    async ({ body }) => {
      const greeting = await addGreeting({
        message: body.message,
        author: body.author,
      });

      return greeting;
    },
    {
      body: t.Object({
        message: t.String({
          maxLength: MAX_MESSAGE_LENGTH,
          error: `Message must be less than ${MAX_MESSAGE_LENGTH} characters`,
        }),
        author: t.String({
          maxLength: MAX_AUTHOR_LENGTH,
          error: `Author must be less than ${MAX_AUTHOR_LENGTH} characters`,
        }),
      }),
    },
  )
  .listen({ port, hostname }, ({ hostname, port }) => {
    console.log(`Server is running on ${hostname}:${port}`);
  });
