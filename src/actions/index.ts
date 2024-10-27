import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { MAX_AUTHOR_LENGTH, MAX_MESSAGE_LENGTH } from "../../server/db";
import { apiUrl } from "../constants";

export const server = {
  setGreeting: defineAction({
    accept: "json",
    input: z.object({
      message: z.string().max(MAX_MESSAGE_LENGTH),
      author: z.string().max(MAX_AUTHOR_LENGTH),
    }),
    handler: async ({ message, author }) => {
      console.log("message", message);
      console.log("apiUrl", apiUrl);

      const res = await fetch(`${apiUrl}/greeting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message, author }),
      });

      if (res.ok) {
        const body = await res.json();
        return { success: true, greeting: body };
      } else {
        // const text = await res.text();
        throw new ActionError({
          message: "Failed to set greeting",
          code: "BAD_REQUEST",
        });
      }
    },
  }),
};
