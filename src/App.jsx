import React, { useEffect, useState } from 'react';
import Heading from './components/Heading';
import Contact from './components/Contact';

function parseCSV(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const headerLine = lines.shift();
  const headers = headerLine.split(',').map(h => h.trim());

  return lines.map(line => {
    const values = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"' ) { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { values.push(cur); cur = ''; }
      else cur += ch;
    }
    values.push(cur);
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = (values[idx] || '').trim(); });
    return obj;
  });
}

export default function App() {
  const [site, setSite] = useState(null);
  useEffect(() => {
    fetch('/websites.csv')
      .then(r => r.text())
      .then(text => {
        const parsed = parseCSV(text);
        // get target domain from env
        const target = process.env.REACT_APP_TARGET_DOMAIN;
        let sel;
        if (target) {
          sel = parsed.find(p => p.domain === target);
        }
        // fallback: if target not set, use first record
        if (!sel && parsed.length > 0) sel = parsed[0];
        setSite(sel || null);
      })
      .catch(err => {
        console.error('CSV fetch/parse error:', err);
      });
  }, []);

  if (!site) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth:800, margin:'0 auto' }}>
      <Heading title={site.title} description={site.description} />
      <Contact phone={site.phone} address={site.address} />
    </div>
  );
}
