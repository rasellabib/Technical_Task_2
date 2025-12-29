// build-all.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function parseCSV(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const headers = lines.shift().split(",");
  return lines.map((line) => {
    let cur = "",
      insideQuotes = false;
    const values = [];
    for (let ch of line) {
      if (ch === '"') {
        insideQuotes = !insideQuotes;
        continue;
      }
      if (ch === "," && !insideQuotes) {
        values.push(cur);
        cur = "";
      } else cur += ch;
    }
    values.push(cur);
    const obj = {};
    headers.forEach((h, i) => (obj[h] = (values[i] || "").trim()));
    return obj;
  });
}

const csv = fs.readFileSync("websites.csv", "utf8");
const sites = parseCSV(csv);

for (const site of sites) {
  console.log(`\n=== Building for ${site.domain} ===`);

  // 1) write .env file dynamically
  fs.writeFileSync(".env", `REACT_APP_TARGET_DOMAIN=${site.domain}\n`);

  // 2) run react build
  execSync("npm run build", { cwd: __dirname, stdio: "inherit" });

  // 3) copy to /build/<domain>
  const src = path.join(process.cwd(), "build");
  const dest = path.join(process.cwd(), "build", site.domain);

  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });

  // copy all files
  function copyRecursive(srcDir, destDir) {
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      if (fs.statSync(srcFile).isDirectory()) {
        fs.mkdirSync(destFile, { recursive: true });
        copyRecursive(srcFile, destFile);
      } else {
        fs.copyFileSync(srcFile, destFile);
      }
    }
  }
  copyRecursive(src, dest);

  console.log(`✔ Built site at build/${site.domain}`);
}

// cleanup .env
fs.rmSync(".env");
console.log("\n✅ All sites built successfully!");
