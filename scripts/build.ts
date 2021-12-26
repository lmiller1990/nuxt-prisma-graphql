import { spawn } from "child_process";

// must build server first for types and graphql schema
const server = spawn(
  "yarn",
  ["lerna", "run", "build", "--scope", "@packages/app-server"],
  {
    stdio: "inherit",
  }
);

server.on("exit", () => {
  spawn("yarn", ["lerna", "run", "build", "--ignore", "@packages/app-server"], {
    stdio: "inherit",
  }).on("exit", () => {
    console.log("Done building");
  });
});
