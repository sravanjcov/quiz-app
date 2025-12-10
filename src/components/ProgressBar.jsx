// src/components/ProgressBar.jsx
import React from 'react';

const TIMER_MAX = 30; // Matches the value in useQuiz

const ProgressBar = ({ timer }) => {
  // Calculates the width percentage
  const progressPercent = (timer / TIMER_MAX) * 100;

  return (
    <div style={{
      height: '8px',
      backgroundColor: 'var(--color-light-gray)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '20px',
    }}>
      <div
        style={{
          width: `${progressPercent}%`,
          height: '100%',
          backgroundColor: progressPercent > 10 ? 'var(--color-primary)' : 'var(--color-error)', // Changes color when low
          transition: 'width 1s linear', // Smooth countdown transition
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;