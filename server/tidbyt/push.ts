import { getCurrentlyDisplayedGreeting } from "../greetings";
import { $ } from "bun";
import { generate, RENDERED_FILE_PATH, type GenerateData } from "./generate";

let latestRenderedId: number | null = null;

const TIDBYT_API_TOKEN = process.env.TIDBYT_API_TOKEN;
const TIDBYT_DEVICE_ID = process.env.TIDBYT_DEVICE_ID;

if (!TIDBYT_API_TOKEN || !TIDBYT_DEVICE_ID) {
  throw new Error("TIDBYT_API_TOKEN and TIDBYT_DEVICE_ID must be set");
}

const renderAndPush = async () => {
  const greeting = await getCurrentlyDisplayedGreeting();
  if (!greeting) {
    return;
  }

  console.log("latest greeting", greeting.id);

  if (latestRenderedId !== greeting.id) {
    const data = {
      message: greeting.message,
      author: greeting.author,
    } satisfies GenerateData;

    console.log("generating new webp", data);

    await generate(data);
    latestRenderedId = greeting.id;
  }

  await $`pixlet push ${TIDBYT_DEVICE_ID} ${RENDERED_FILE_PATH} --api-token ${TIDBYT_API_TOKEN}`;
};

console.log("starting push loop");

await renderAndPush();

setInterval(async () => {
  await renderAndPush();
}, 1000 * 12);

Bun.serve({
  port: 3000,
  hostname: "::",

  fetch: async () => {
    await renderAndPush();
    return new Response("ok");
  },
});
