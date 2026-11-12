import { existsSync } from "node:fs";

// cPanel Passenger's conventional startup file. Support both a build kept in
// `.output` and the contents of that build uploaded directly to the app root.
const sourceBuild = new URL("./.output/server/index.mjs", import.meta.url);
const uploadedBuild = new URL("./server/index.mjs", import.meta.url);

await import((existsSync(sourceBuild) ? sourceBuild : uploadedBuild).href);
