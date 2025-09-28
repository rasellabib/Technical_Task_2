import React from 'react';

export default function Heading({ title, description }) {
  return (
    <section style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <p style={{ marginTop: 10 }}>{description}</p>
    </section>
  );
}
