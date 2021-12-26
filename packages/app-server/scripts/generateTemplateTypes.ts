import fs from "fs";
import { enumType } from "nexus";
import path from "path";

const packages = fs.readdirSync(path.join(__dirname, "..", ".."));
const templates = packages
  .filter((x) => x.startsWith("template-"))
  .map((x) => x.slice("template-".length));

export const gqlThemeName = enumType({
  name: 'ThemeName',
  members: templates
})
