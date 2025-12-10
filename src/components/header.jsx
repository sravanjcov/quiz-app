// src/components/Header.jsx
import React from 'react';

const Header = () => (
  <header className="text-center" style={{ marginBottom: '30px' }}>
    <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.5px' }}>
      <span role="img" aria-label="Brain"></span> React Quiz Master
    </h1>
    <p style={{ color: 'var(--color-light-gray)' }}>Test your knowledge. Achieve mastery.</p>
  </header>
);

export default Header;