import gulp from "gulp";
import { spawn } from "child_process";
import pDefer from "p-defer";
import chokidar from "chokidar";
import { DefaultDeserializer } from "v8";

async function serverDev() {
  spawn(
    "yarn",
    [
      "ts-node-dev",
      "--respawn",
      "--exit-child",
      "--transpile-only",
      "src",
      "index.ts",
    ],
    { stdio: "inherit", cwd: "packages/app-server" }
  );
}

async function gqlCodegen() {
  const w = chokidar.watch("src/**/*.vue");
  const runCodegen = () => {
    console.log("Running GraphQL Codegen...");
    return spawn("yarn", ["gql:codegen"], {
      stdio: "inherit",
      cwd: "packages/app-client",
    });
  };

  w.on("change", (path) => {
    console.log(`${path} has changed -> running GraphQL codegen...`);
    runCodegen();
  });

  runCodegen();
}

async function nexusTypegenWatch() {
  const dfd = pDefer()

  const runGen = () => {
    console.log("generating nexus schema...");
    const out = spawn("yarn", ["nexus:dev"], {
      stdio: "inherit",
      cwd: "packages/app-server",
    });

    out.on("error", (err) => {
      console.error("exit nexus typegen due to error", err);
    });

    out.on("exit", () => {
      console.log("nexus schema generated");
      dfd.resolve()
    });
  };

  chokidar.watch("./packages/app-server/src/*").on("change", runGen);

  runGen()

  return dfd.promise
}

async function rebuildPrisma() {
  const dfd = pDefer();
  const s = spawn("yarn", ["prisma", "migrate", "dev"], {
    stdio: "inherit",
    cwd: "packages/app-server",
  });

  s.on("exit", () => {
    spawn("yarn", ["prisma", "generate"], {
      stdio: "inherit",
      cwd: "packages/app-server",
    });
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
      "./src/output.css",
      "--watch",
    ],
    { stdio: "inherit", cwd: "packages/app-client" }
  );
}

async function startViteDevServer() {
  spawn("yarn", ["dev"], { stdio: "inherit", cwd: "packages/app-client" });
}

gulp.task(
  "dev:watch",
  gulp.series(
    rebuildPrisma,
    gulp.parallel(tailwindDev, startViteDevServer),
    nexusTypegenWatch,
    gqlCodegen,
    serverDev
  )
);

gulp.task("dev", gulp.series("dev:watch"));
