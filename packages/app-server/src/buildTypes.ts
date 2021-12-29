import fs from "fs";
import path from "path";

const packages = fs.readdirSync(path.join(__dirname, "..", ".."));
const templates = packages
  .filter((x) => x.startsWith("template-"))
  .map((x) => x.slice("template-".length))
  .map((x) => `"${x}"`);

const typeDef = `export type Theme = ${templates.join(" | ")}`;

fs.writeFileSync(path.join(__dirname, "themes.ts"), typeDef);
