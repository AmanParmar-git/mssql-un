const { spawn } = require("child_process");

const p = spawn("msiinv.exe", [
  "-s",
  "|",
  'Select-String "SQL Server"',
  "-Context 0,1",
]);

p.stdout.pipe(process.stdout);
