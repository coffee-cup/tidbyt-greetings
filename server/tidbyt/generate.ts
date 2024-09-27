import { $ } from "bun";
import fs from "node:fs";
import path from "node:path";

const TEMPLATE_FILE = path.join(__dirname, "template.star");

const GENERATED_DIR = path.join(__dirname, "generated");

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
  fs.writeFileSync(path.join(GENERATED_DIR, "greeting.star"), rendered);

  await $`pixlet render ${GENERATED_DIR}/greeting.star`;
}

// Run the function when the script is executed directly
if (import.meta.main) {
  generate({
    message: "beep boop yoooooo",
    author: "jr",
  });
}
