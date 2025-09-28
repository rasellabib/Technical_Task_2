import React from 'react';

export default function Contact({ phone, address }) {
  return (
    <section style={{ padding: '20px', borderTop: '1px solid #eee' }}>
      <h3>Contact</h3>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
    </section>
  );
}
