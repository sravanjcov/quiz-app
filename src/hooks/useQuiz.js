// src/hooks/useQuiz.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getQuestions, postResult } from '../api/api';

const TIMER_SECONDS = 30;

export function useQuiz() {
  // Core State
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(-1); // -1: Start, 0-N: Quiz, N+1: Result
  const [answers, setAnswers] = useState([]); // Array of { questionId, selectedOption, isCorrect }

  // UI/Flow State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // --- Core Functions ---

  /**
   * Starts the quiz by fetching questions.
   */
  const startQuiz = useCallback(async () => {
    if (!username.trim()) return; // Validation check

    setLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
      setQuestionIndex(0); // Move to the first question
      setAnswers([]); // Reset previous answers
      setTimer(TIMER_SECONDS);
      setIsQuizActive(true);
    } catch (err) {
      setError('Failed to load questions. Please check the json-server.');
      setQuestionIndex(-1); // Stay on start screen
    } finally {
      setLoading(false);
    }
  }, [username]);

  /**
   * Moves to the next question, optionally recording an answer.
   * @param {string} [selectedOption] - The option the user selected.
   */
  const moveToNextQuestion = useCallback((selectedOption = null) => {
    // 1. Record Answer (if any)
    const currentQuestion = questions[questionIndex];
    if (currentQuestion && selectedOption) {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      setAnswers(prevAnswers => [
        ...prevAnswers,
        {
          questionId: currentQuestion.id,
          selectedOption,
          isCorrect,
        },
      ]);
    }

    // 2. Check if the quiz is over
    if (questionIndex >= questions.length - 1) {
      setIsQuizActive(false); // Stop the timer effect
      setQuestionIndex(questions.length); // Indicate end of quiz (Result Screen)
      return;
    }

    // 3. Move to the next question
    setQuestionIndex(prevIndex => prevIndex + 1);
    setTimer(TIMER_SECONDS); // Reset timer for the new question
  }, [questions, questionIndex]);

  // --- Side Effects (useEffect) ---

  // 1. Timer Logic
  useEffect(() => {
    // Only run the timer if the quiz is active (on a question screen)
    if (!isQuizActive || questionIndex === -1 || questionIndex >= questions.length) {
      return; // Exit if not in an active quiz state
    }

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          // Time is up -> Auto-move to the next question
          moveToNextQuestion();
          return TIMER_SECONDS; // Reset timer for the new question immediately
        }
        return prevTimer - 1; // Countdown
      });
    }, 1000);

    // **Cleanup Logic**: This is crucial. It stops the interval when:
    // a) The component unmounts.
    // b) The dependencies ([isQuizActive, questionIndex, questions, moveToNextQuestion]) change.
    // Without it, the timer keeps running and can cause memory leaks and incorrect behavior.
    return () => clearInterval(interval);
  }, [isQuizActive, questionIndex, questions.length, moveToNextQuestion]);

  // 2. Post Result Logic (Runs once when quiz is over)
  useEffect(() => {
    if (questionIndex === questions.length && questions.length > 0) {
      const score = answers.filter(a => a.isCorrect).length;
      const total = questions.length;

      const result = {
        name: username,
        score: score,
        total: total,
      };

      // Post result to the server
      const submitResult = async () => {
        try {
          await postResult(result);
        } catch (err) {
          setError('Failed to submit result to the leaderboard.');
        }
      };
      submitResult();
    }
  }, [questionIndex, questions.length, answers, username]); // Dependencies trigger this on quiz end

  // --- Computed Values (useMemo) ---

  /**
   * Computes the final statistics for the result screen.
   */
  const quizStatistics = useMemo(() => {
    const totalQuestions = questions.length;
    if (totalQuestions === 0) {
      return { score: 0, total: 0, percentage: 0, correctCount: 0, incorrectCount: 0 };
    }

    const correctCount = answers.filter(a => a.isCorrect).length;
    const incorrectCount = answers.filter(a => !a.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    return {
      score: correctCount,
      total: totalQuestions,
      percentage: percentage,
      correctCount,
      incorrectCount,
    };
  }, [answers, questions.length]);

  // --- Exposed Values and Handlers ---

  const currentQuestion = questions[questionIndex];
  const isQuizComplete = questionIndex === questions.length && questions.length > 0;

  return {
    // State
    username,
    currentQuestion,
    questionIndex,
    totalQuestions: questions.length,
    timer,
    loading,
    error,
    isQuizComplete,
    // Handlers
    setUsername,
    startQuiz,
    moveToNextQuestion,
    // Computed Data
    quizStatistics,
  };
}