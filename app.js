import { existsSync } from "node:fs";

// cPanel Passenger's conventional startup file. Support both a build kept in
// `.output` and the contents of that build uploaded directly to the app root.
const sourceBuild = new URL("./.output/server/index.mjs", import.meta.url);
const uploadedBuild = new URL("./server/index.mjs", import.meta.url);
const entry = existsSync(sourceBuild) ? sourceBuild : uploadedBuild;

// Passenger loads this file through CommonJS `require()`. Do not use top-level
// await here: Node then rejects the entry before Nitro gets a chance to listen.
void import(entry.href).catch((error) => {
  console.error("Unable to start the generated Nitro server.", error);
  process.exitCode = 1;
});
