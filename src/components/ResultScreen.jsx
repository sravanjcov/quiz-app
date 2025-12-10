// src/components/ResultScreen.jsx
import React from 'react';
import Card from './card';
import Leaderboard from './Leaderboard';

const ResultScreen = ({ username, statistics, onRestart }) => {
  const { percentage, score, total, correctCount, incorrectCount } = statistics;

  // Animated Score Bar
  const ScoreBar = () => (
    <div style={{ margin: '20px 0', height: '15px', borderRadius: '7px', overflow: 'hidden', backgroundColor: 'var(--color-error)' }}>
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: 'var(--color-success)',
          transition: 'width 1s ease-out', // Animated progress
        }}
      ></div>
    </div>
  );

  return (
    <>
      <Card style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>🎉 Congratulations, {username}!</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-light-gray)', marginBottom: '30px' }}>
          You have completed the React Quiz.
        </p>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '3rem', margin: '10px 0' }}>
            {percentage}%
          </h3>
          <p style={{ fontWeight: '600' }}>Your Final Score</p>
          <ScoreBar />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
          <div style={{ borderRight: '1px solid var(--color-background)', paddingRight: '20px' }}>
            <p style={{ color: 'var(--color-success)', fontSize: '1.8rem', fontWeight: 'bold' }}>{correctCount}</p>
            <p> Correct Answers</p>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            <p style={{ color: 'var(--color-error)', fontSize: '1.8rem', fontWeight: 'bold' }}>{incorrectCount}</p>
            <p> Incorrect Answers</p>
          </div>
        </div>
        
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Total Questions: {total}
        </p>

        <button onClick={onRestart} style={{ marginTop: '30px' }}>
          Start New Quiz
        </button>
      </Card>

      <Leaderboard />
    </>
  );
};

export default ResultScreen;