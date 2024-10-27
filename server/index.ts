import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { MAX_AUTHOR_LENGTH, MAX_MESSAGE_LENGTH } from "./db";
import { addGreeting, getGreetings } from "./greetings";

const port = 4000;
const hostname = "0.0.0.0";

new Elysia()
  .use(cors())
  .get("/", () => "Tidbyt Message Board")
  .get("/hello", "hi")
  .get("/greetings", () => {
    return getGreetings();
  })
  .post(
    "/greeting",
    async ({ body }) => {
      console.log("setting greeting", body);

      const greeting = await addGreeting(
        {
          message: body.message,
          author: body.author,
        },
        body.force,
      );

      await notifyPushServer();

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
        force: t.Optional(t.Boolean()),
      }),
    },
  )
  .listen({ port, hostname }, ({ hostname, port }) => {
    console.log(`Server is running on ${hostname}:${port}`);
  });

const notifyPushServer = async () => {
  const pushUrl = process.env.PUSH_SERVER_URL;
  if (!pushUrl) {
    console.log("PUSH_SERVER_URL is not set");
    return;
  }

  try {
    await fetch(pushUrl);
    console.log("notified push server");
  } catch (e) {
    console.error("failed to notify push server", e);
  }
};
