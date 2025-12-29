import React, { useEffect, useState } from "react";

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

function Hero({ title, description }) {
  return (
    <header
      style={{ padding: "20px", background: "#f9f9ff", textAlign: "center" }}
    >
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function Contact({ phone, address }) {
  return (
    <section style={{ padding: "20px", borderTop: "1px solid #eee" }}>
      <h3>Contact</h3>
      <p>📞 {phone}</p>
      <p>📍 {address}</p>
    </section>
  );
}

export default function App() {
  const [site, setSite] = useState(null);

  useEffect(() => {
    fetch("/websites.csv")
      .then((r) => r.text())
      .then((txt) => {
        const allSites = parseCSV(txt);
        const target = process.env.REACT_APP_TARGET_DOMAIN;
        if (target) {
          setSite(allSites.find((s) => s.domain === target));
        } else {
          setSite(allSites[0]); // dev mode → just first site
        }
      });
  }, []);

  if (!site) return <p>Loading...</p>;

  return (
    <div>
      <Hero title={site.title} description={site.description} />
      <Contact phone={site.phone} address={site.address} />
      <footer
        style={{
          padding: "10px",
          textAlign: "right",
          fontSize: "12px",
          color: "#555",
        }}
      >
        {site.domain}
      </footer>
    </div>
  );
}
