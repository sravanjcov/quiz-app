// src/components/Card.jsx
import React from 'react';

const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`card-base ${className}`}
    style={{
      backgroundColor: 'var(--color-card-background)',
      borderRadius: 'var(--border-radius-base)',
      padding: '30px',
      boxShadow: 'var(--shadow-elevation)',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;