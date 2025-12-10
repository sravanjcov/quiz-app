// src/components/StartScreen.jsx
import React from 'react';
import Card from './card';

const StartScreen = ({ username, setUsername, startQuiz }) => {
  const isInputValid = username.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInputValid) {
      startQuiz();
    }
  };

  return (
    <Card>
      <h2 className="text-center">Welcome to the React Quiz!</h2>
      <p className="text-center my-4">Enter your name to begin the challenge.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input
          type="text"
          placeholder="Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit" disabled={!isInputValid}>
          Start Quiz &rarr;
        </button>
      </form>
    </Card>
  );
};

export default StartScreen;