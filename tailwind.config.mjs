const theme = {
  flamingo: "rgb(var(--color-flamingo) / <alpha-value>)",
  pink: "rgb(var(--color-pink) / <alpha-value>)",
  mauve: "rgb(var(--color-mauve) / <alpha-value>)",
  red: "rgb(var(--color-red) / <alpha-value>)",
  maroon: "rgb(var(--color-maroon) / <alpha-value>)",
  peach: "rgb(var(--color-peach) / <alpha-value>)",
  yellow: "rgb(var(--color-yellow) / <alpha-value>)",
  green: "rgb(var(--color-green) / <alpha-value>)",
  teal: "rgb(var(--color-teal) / <alpha-value>)",
  sky: "rgb(var(--color-sky) / <alpha-value>)",
  sapphire: "rgb(var(--color-sapphire) / <alpha-value>)",
  blue: "rgb(var(--color-blue) / <alpha-value>)",
  lavender: "rgb(var(--color-lavender) / <alpha-value>)",
  text: "rgb(var(--color-text) / <alpha-value>)",
  "subtext-1": "rgb(var(--color-subtext-1) / <alpha-value>)",
  "subtext-0": "rgb(var(--color-subtext-0) / <alpha-value>)",
  "overlay-2": "rgb(var(--color-overlay-2) / <alpha-value>)",
  "overlay-1": "rgb(var(--color-overlay-1) / <alpha-value>)",
  "overlay-0": "rgb(var(--color-overlay-0) / <alpha-value>)",
  "surface-2": "rgb(var(--color-surface-2) / <alpha-value>)",
  "surface-1": "rgb(var(--color-surface-1) / <alpha-value>)",
  "surface-0": "rgb(var(--color-surface-0) / <alpha-value>)",
  base: "rgb(var(--color-base) / <alpha-value>)",
  mantle: "rgb(var(--color-mantle) / <alpha-value>)",
  crust: "rgb(var(--color-crust) / <alpha-value>)",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: theme,
    },
  },
  plugins: [],
};
