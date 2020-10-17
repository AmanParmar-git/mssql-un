const { exec } = require("child_process");
const fs = require("fs");

exec(
  "wmic product where \"name like '%sql server%'\" get name,identifyingnumber",
  (err, data) => {
    if (err) throw err;
    let arr = data.trim().split("\n");
    arr = arr.filter((t) => t.includes("MySQL") === false);
    let res = [];
    for (let i = 1; i < arr.length; i++) {
      const index = arr[i].indexOf("} ");
      const guid = arr[i].substring(0, index + 1);
      const name = arr[i].slice(index + 1).trim();
      res.push({ name: name, guid: guid });
    }
    let batStr = "";
    for (let a of res) {
      batStr +=
        "rem " + a.name + "\n" + "msiexec /x " + `"${a.guid}" ` + "\n\n";
    }

    fs.writeFileSync("remove.bat", batStr);
  }
);
