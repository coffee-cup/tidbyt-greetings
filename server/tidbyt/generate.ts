import { $ } from "bun";
import fs from "node:fs";
import path from "node:path";

const TEMPLATE_FILE = path.join(__dirname, "template.star");

const GENERATED_DIR = path.join(__dirname, "generated");

const RENDER_FILE_NAME = "generated";

export async function generate({
  message,
  author,
}: {
  message: string;
  author: string;
}) {
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
  const renderedWebp = path.join(GENERATED_DIR, `${RENDER_FILE_NAME}.webp`);

  const file = Bun.file(renderedWebp);
  return file.arrayBuffer();
}

// Run the function when the script is executed directly
if (import.meta.main) {
  generate({
    message: "beep boop yoooooo",
    author: "jr",
  });
}

export async function getLatestRenderFile() {
  const renderedWebp = path.join(GENERATED_DIR, `${RENDER_FILE_NAME}.webp`);
  const file = Bun.file(renderedWebp);

  if (!file.exists()) {
    throw new Error("Rendered file does not exist");
  }

  return file;
}
