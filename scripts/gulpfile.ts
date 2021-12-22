import gulp from "gulp";
import { spawn } from "child_process";
import pDefer from "p-defer";
import chokidar from "chokidar";

async function serverDev () {
  spawn("yarn", ["ts-node-dev", "--respawn", "--exit-child", "--transpile-only", "api/index.ts"], { stdio: "inherit" });
}

async function gqlCodegen () {
  const dfd = pDefer()
  const w = chokidar.watch('./src/**/*.vue')

  w.on('all', () => {
    const out = spawn('yarn', ['gql:codegen'], { stdio: 'inherit' })
    out.on('data', () => {
      dfd.resolve()
    })
  })

  return dfd.promise
}

async function nexusTypegenWatch () {
  const dfd = pDefer()
  const w = chokidar.watch('./api/types.ts')

  w.on('all', () => {
    const out = spawn('yarn', ['nexus:dev'], { stdio: 'inherit' })
    out.on('data', () => {
      dfd.resolve()
    })
  })
}

async function rebuildPrisma () {
  const dfd = pDefer()
  const s = spawn("yarn", ["prisma", "generate"], { stdio: "inherit" });
  s.on('exit', () => {
    console.log("Done rebuilding prisma")
    dfd.resolve()
  })

  return dfd.promise
}

async function startViteDevServer () {
  spawn('yarn', ['vite:dev'], { stdio: 'inherit' })
}

gulp.task("dev:watch", gulp.series(
  rebuildPrisma,
  gulp.parallel(
    startViteDevServer,
    nexusTypegenWatch,
    serverDev,
    gqlCodegen
  )
));

gulp.task("dev", gulp.series("dev:watch"));
