const { spawn } = require("child_process");
const os = require("os");

const platform = os.platform();
let p;
if (platform === "linux") {
  p = spawn("apt", ["list", "--installed"]);
}

p.stdout.pipe(process.stdout);
process.stdin.pipe(p.stdin);

p.on("close", (c) => process.exit(c));
