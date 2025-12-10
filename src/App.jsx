// src/App.jsx
import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import ResultScreen from './components/ResultScreen';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const {
    username,
    setUsername,
    startQuiz,
    currentQuestion,
    questionIndex,
    totalQuestions,
    timer,
    loading,
    error,
    isQuizComplete,
    moveToNextQuestion,
    quizStatistics
  } = useQuiz();

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner text="Loading Quiz Questions..." />;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    // 1. Start Screen
    if (questionIndex === -1) {
      return <StartScreen username={username} setUsername={setUsername} startQuiz={startQuiz} />;
    }

    // 2. Quiz Questions
    if (currentQuestion) {
      return (
        <Question
          question={currentQuestion}
          questionNumber={questionIndex + 1}
          totalQuestions={totalQuestions}
          timer={timer}
          onAnswerSelect={moveToNextQuestion}
        />
      );
    }

    // 3. Result Screen
    if (isQuizComplete) {
      return (
        <ResultScreen
          username={username}
          statistics={quizStatistics}
          onRestart={() => window.location.reload()} // Simple restart for demo
        />
      );
    }

    // Fallback (shouldn't happen in normal flow)
    return <p className="text-center my-4">Something went wrong.</p>;
  };

  return (
    <>
      <Header />
      <main>
        {renderContent()}
      </main>
    </>
  );
}

export default App;