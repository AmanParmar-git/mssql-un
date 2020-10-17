const { spawn } = require("child_process");
const os = require("os");

const platform = os.platform();
let p;
let d = "";
if (platform === "linux") {
  p = spawn("apt", ["list", "--installed"]);
}
p.stdout.on("data", (data) => {
  d += data;
});

p.stdout.on("end", () => {
  d.replace("]", "]\n");
  const arr = d.split("\n");
  for (let a of arr) {
    if (a.startsWith("python")) {
      const s = spawn("apt", ["remove", [a]]);
      s.stdout.pipe(process.stdout);
    }
  }
});
p.on("close", (c) => {
  process.exit(c);
});
