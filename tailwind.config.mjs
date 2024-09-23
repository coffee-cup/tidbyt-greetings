const rosePineDawn = {
  base: "var(--color-base)",
  surface: "var(--color-surface)",
  overlay: "var(--color-overlay)",
  muted: "var(--color-muted)",
  subtle: "var(--color-subtle)",
  text: "var(--color-text)",
  love: "var(--color-love)",
  gold: "var(--color-gold)",
  rose: "var(--color-rose)",
  pine: "var(--color-pine)",
  foam: "var(--color-foam)",
  iris: "var(--color-iris)",
  "highlight-low": "var(--color-highlight-low)",
  "highlight-med": "var(--color-highlight-med)",
  "highlight-high": "var(--color-highlight-high)",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: rosePineDawn,
    },
  },
  plugins: [],
};
