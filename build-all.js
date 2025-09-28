// build-all.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apps = [
  { dir: 'apps/app-foodexpress', domain: 'foodexpress.com' },
  { dir: 'apps/app-techhubbd', domain: 'techhubbd.com' },
  { dir: 'apps/app-bookbazaar', domain: 'bookbazaar.com' }
];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists ? fs.statSync(src) : null;
  if (!exists) return;
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

apps.forEach(a => {
  console.log('Building:', a.dir);
  execSync('npm run build', { cwd: a.dir, stdio: 'inherit' });

  const buildSrc = path.join(a.dir, 'build');
  const buildDest = path.join(process.cwd(), 'build', a.domain);
  // remove old
  fs.rmSync(buildDest, { recursive: true, force: true });
  copyRecursiveSync(buildSrc, buildDest);
  console.log('Copied build to', buildDest);
});
