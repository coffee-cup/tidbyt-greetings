// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  adapter: node({
    mode: "standalone",
  }),
});
