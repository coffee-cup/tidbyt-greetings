import { $ } from "bun";
import fs from "node:fs";
import path from "node:path";

const TEMPLATE_FILE = path.join(__dirname, "template.star");

const GENERATED_DIR = path.join(__dirname, "generated");
const RENDER_FILE_NAME = "generated";

export const RENDERED_FILE_PATH = path.join(
  GENERATED_DIR,
  `${RENDER_FILE_NAME}.webp`,
);

export type GenerateData = {
  message: string;
  author: string;
};

export async function generate({ message, author }: GenerateData) {
  const template = fs.readFileSync(TEMPLATE_FILE, "utf8");
  const rendered = template
    .replace("MESSAGE", message)
    .replace("AUTHOR", author);

  await $`mkdir -p ${GENERATED_DIR}`;
  fs.writeFileSync(
    path.join(GENERATED_DIR, `${RENDER_FILE_NAME}.star`),
    rendered,
  );

  await $`pixlet render ${GENERATED_DIR}/${RENDER_FILE_NAME}.star`;

  const file = Bun.file(RENDERED_FILE_PATH);
  return file.arrayBuffer();
}

// Run the function when the script is executed directly
if (import.meta.main) {
  generate({
    message: "beep boop yoooooo",
    author: "jr",
  });
}
