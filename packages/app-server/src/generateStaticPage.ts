import { Theme } from "./themes";
import os from "os";
import type { Link } from "@packages/types";
import { spawn } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
import path from "path";
import UUID from "pure-uuid";
import { uploadAsset } from "./upload";

const bucketUrl = "https://linktree-dev.s3.us-east-2.amazonaws.com";

function tmpDir() {
  return os.tmpdir() + path.sep + new UUID(4);
}

export async function generate(
  username: string,
  links: Link[],
  theme: Theme
): Promise<string> {
  const dir = tmpDir();
  console.log(`Creating tmp dir ${dir}`);
  await fs.mkdirp(dir);
  await fs.copy(path.join(__dirname, "..", "..", `template-${theme}`), dir);

  console.log("Building site...");

  return new Promise((resolve) => {
    const s = spawn("yarn", ["vite", "build"], {
      stdio: "inherit",
      cwd: dir,
    });

    s.on("exit", async () => {
      const indexHtml = await getPathsForGeneratedAssets(dir, username, links);
      resolve(indexHtml);
    });
  });
}

const scriptLinksTag = "<script data-links></script>";

async function getPathsForGeneratedAssets(
  dir: string,
  username: string,
  links: Link[]
): Promise<string> {
  const dist = path.join(dir, "dist");
  let indexHtml = await fs.readFile(path.join(dist, "index.html"), "utf-8");
  const assets = await fs.readdir(path.join(dist, "assets"));

  for (const asset of assets) {
    indexHtml = indexHtml.replace(`/assets/${asset}`, `${bucketUrl}/${asset}`);
  }

  indexHtml = indexHtml.replace(
    scriptLinksTag,
    `<script>window.links = ${JSON.stringify(links)}</script>`
  );

  await Promise.all([
    ...assets.map(async (x) => {
      return uploadAsset(
        x,
        await fs.readFile(path.join(dist, "assets", x), "utf-8"),
        x.endsWith('css') ? 'css' : 'javascript'
      );
    }),
    uploadAsset(`${username}.html`, indexHtml, 'html'),
  ]);

  return indexHtml;
}

generate(
  "lachlan",
  [{ href: "https://lachlan-miller.me", text: "My website" }],
  "forest"
)
  .then(console.log)
  .catch(console.error);
