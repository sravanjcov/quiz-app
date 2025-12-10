// src/components/Question.jsx
import React, { useState } from 'react';
import Card from './card';
import ProgressBar from './ProgressBar';
import AnswerButton from './AnswerButton';

const Question = ({ question, questionNumber, totalQuestions, timer, onAnswerSelect }) => {
  // Local state to manage the visual transition effect
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (option) => {
    // 1. Trigger exit animation
    setIsAnimating(true);
    
    // 2. Wait for the animation to finish, then move to the next question
    // 300ms matches a common CSS transition time (for the smooth transition requirement)
    setTimeout(() => {
      onAnswerSelect(option); // Move to next question and record answer
      setIsAnimating(false); // Reset for the next question
    }, 300); 
  };

  const animationStyle = {
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)',
    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out', // Smooth transition
  };

  return (
    <Card style={{ padding: '40px' }}>
      <ProgressBar timer={timer} />
      
      <div style={animationStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
            Question {questionNumber} / {totalQuestions}
          </h3>
          <span style={{ fontSize: '1.2rem', fontWeight: '600', color: timer < 10 ? 'var(--color-error)' : 'var(--color-primary)' }}>
            {timer}s
          </span>
        </div>

        <p style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '30px' }}>
          {question.text}
        </p>

        <div style={{ display: 'grid', gap: '15px' }}>
          {question.options.map((option, index) => (
            <AnswerButton
              key={index}
              option={option}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Question;