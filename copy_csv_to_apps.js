// copy_csv_to_apps.js
const fs = require('fs');
const path = require('path');

const apps = [
  'apps/app-foodexpress',
  'apps/app-techhubbd',
  'apps/app-bookbazaar'
];

if (!fs.existsSync('websites.csv')) {
  console.error('websites.csv not found. Run node generate_csv.js first.');
  process.exit(1);
}

const csv = fs.readFileSync('websites.csv', 'utf8');

apps.forEach(app => {
  const destDir = path.join(app, 'public');
  if (!fs.existsSync(destDir)) {
    console.warn('App public dir not found:', destDir);
    return;
  }
  const dest = path.join(destDir, 'websites.csv');
  fs.writeFileSync(dest, csv, 'utf8');
  console.log('Copied websites.csv to', dest);
});
