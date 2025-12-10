// src/components/AnswerButton.jsx
import React from 'react';

const AnswerButton = ({ option, onSelect }) => (
  <button
    onClick={() => onSelect(option)}
    style={{
      width: '100%',
      padding: '15px 20px',
      textAlign: 'left',
      backgroundColor: 'var(--color-card-background)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-light-gray)',
      boxShadow: 'none',
      fontWeight: '400',
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background)'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-card-background)'}
  >
    {option}
  </button>
);

export default AnswerButton;