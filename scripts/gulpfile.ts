import gulp from "gulp";
import { spawn } from "child_process";
import pDefer from "p-defer";
import chokidar from "chokidar";

async function serverDev() {
  spawn(
    "yarn",
    [
      "ts-node-dev",
      "--respawn",
      "--exit-child",
      "--transpile-only",
      "index.ts",
    ],
    { stdio: "inherit", cwd: "packages/app-server" }
  );
}

async function gqlCodegen() {
  const w = chokidar.watch("./src/**/*.vue");
  const runCodegen = () =>
    spawn("yarn", ["gql:codegen"], {
      stdio: "inherit",
      cwd: "packages/app-client",
    });

  w.on("ready", () => {
    console.log('Running GraphQL Codegen...')
    runCodegen();
  });

  w.on("all", () => {
    const out = runCodegen();
    out.on("data", () => {});
    out.on("error", (err) => {
      console.error("gql:codegen", err);
    });
  });
}

async function nexusTypegenWatch() {
  const dfd = pDefer();
  const w = chokidar.watch("./packages/app-server/api/schema.ts");

  w.on("all", () => {
    const out = spawn("yarn", ["nexus:dev"], {
      stdio: "inherit",
      cwd: "packages/app-server",
    });
    out.on("data", () => {
      dfd.resolve();
    });

    out.on("error", (err) => {
      console.error("exit nexus typegen due to error", err);
    });

    out.on("exit", () => {
      console.error("exit nexus typegen due to error");
    });
  });

  dfd.promise;
}

async function rebuildPrisma() {
  const dfd = pDefer();
  const s = spawn("yarn", ["prisma", "generate"], {
    stdio: "inherit",
    cwd: "packages/app-server",
  });
  s.on("exit", () => {
    console.log("Done rebuilding prisma");
    dfd.resolve();
  });

  return dfd.promise;
}

async function tailwindDev() {
  spawn(
    "yarn",
    [
      "tailwindcss",
      "-i",
      "./src/index.css",
      "-o",
      ".//dist/output.css",
      "--watch",
    ],
    { stdio: "inherit", cwd: "packages/app-client" }
  );
}

async function startViteDevServer() {
  spawn("yarn", ["vite:dev"], { stdio: "inherit", cwd: "packages/app-client" });
}

gulp.task(
  "dev:watch",
  gulp.series(
    rebuildPrisma,
    gulp.parallel(tailwindDev, startViteDevServer),
    gulp.series(nexusTypegenWatch, gqlCodegen),
    serverDev
  )
);

gulp.task("dev", gulp.series("dev:watch"));
