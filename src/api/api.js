// src/api.js
const API_BASE_URL = 'http://localhost:3000';

/**
 * Fetches all quiz questions.
 * @returns {Promise<Array>} A promise that resolves to an array of questions.
 */
export async function getQuestions() {
  const response = await fetch(`${API_BASE_URL}/questions`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions from the server.');
  }
  return response.json();
}

/**
 * Fetches the current leaderboard results.
 * @returns {Promise<Array>} A promise that resolves to an array of results.
 */
export async function getResults() {
  const response = await fetch(`${API_BASE_URL}/results?_sort=score&_order=desc`);
  if (!response.ok) {
    throw new Error('Failed to fetch results.');
  }
  return response.json();
}

/**
 * Posts the final quiz result to the server.
 * @param {Object} result - The user's quiz result object.
 * @returns {Promise<Object>} A promise that resolves to the posted result.
 */
export async function postResult(result) {
  const response = await fetch(`${API_BASE_URL}/results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to submit quiz result.');
  }
  return response.json();
}