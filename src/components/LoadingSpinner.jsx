// src/components/LoadingSpinner.jsx
import React from 'react';

// Spinner styles are inline or could be in index.css
const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid var(--color-primary)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  margin: '20px auto',
};

// Keyframes (must be defined in CSS, placed here for completeness)
// @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="text-center my-4">
    <div style={spinnerStyle}></div>
    <p style={{ color: 'var(--color-primary)' }}>{text}</p>
  </div>
);

export default LoadingSpinner;