import { Theme } from "./themes";
import os from "os";
import { spawn } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import path from "path";
import UUID from "pure-uuid";

const spawna = promisify(spawn);

const __dirname = path.resolve();

function tmpDir() {
  return os.tmpdir() + path.sep + new UUID(4);
}

export async function generate(theme: Theme) {
  try {
    const dir = tmpDir();
    console.log(`Creating tmp dir ${dir}`);
    await fs.mkdirp(dir);
    await fs.copy(path.join(__dirname, "..", `template-${theme}`), dir);

    console.log("Building site");
    // return new Promise(res, rej) (res, rej) (res, rej) (res, rej) (res, rej) (res, rej) (res, rej) (res, rej) (res, rej)
    await spawna("yarn", ["vite", "build"], {
      stdio: "inherit",
      cwd: dir,
    });
  } catch (e) {
    console.error(e);
  }
}
