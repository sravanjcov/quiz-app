# 🧠 React Quiz Master

A modern, responsive, card-based quiz application built with Vite and React, demonstrating best practices in UI/UX and React hook usage.

## 🚀 Getting Started

This project requires **Node.js** and uses **json-server** for a mock backend API.

### 1. Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/quiz-app.git](https://github.com/your-username/quiz-app.git)
    cd quiz-app
    ```
2.  **Install dependencies** for the React application:
    ```bash
    npm install
    ```
3.  **Install json-server globally** (if you don't have it):
    ```bash
    npm install -g json-server
    ```

### 2. Running the Mock Backend (`json-server`)

The application fetches questions from `/questions` and posts results to `/results` on `http://localhost:3000`.

1.  Open a dedicated terminal window.
2.  Run the server using the provided `db.json` file:
    ```bash
    json-server --watch db.json --port 3000
    ```
    *Keep this terminal running.*

### 3. Running the Vite React App

1.  Open a second terminal window in the project root (`quiz-app`).
2.  Start the Vite development server:
    ```bash
    npm run dev
    ```
3.  Open your browser to the URL displayed in the terminal (usually `http://localhost:5173`).

## ⚛️ React Concepts Explained

### Custom Hook: `useQuiz()`

* **Location:** `src/hooks/useQuiz.js`
* **Purpose:** To abstract all complex business logic, state management, and side effects related to the quiz flow into a single, reusable function. This keeps `App.jsx` clean (separation of concerns).
* **Key States Managed:** `username`, `questions`, `questionIndex`, `answers`, `timer`, `loading`, `error`, `isQuizActive`.

### `useEffect` (Fetch + Timer Logic)

* **Fetch:** An `useEffect` in `useQuiz.js` is used inside the `startQuiz` function (which is memoized with `useCallback`) to perform the asynchronous data fetching (`getQuestions()`) when the quiz starts.
* **Timer Logic:** A separate `useEffect` hook in `useQuiz.js` manages the 30-second countdown interval.

    ```javascript
    useEffect(() => {
      // ... timer logic
      const interval = setInterval(() => { /* ... */ }, 1000);
      return () => clearInterval(interval); // **Cleanup Logic**
    }, [isQuizActive, questionIndex, /* ... */]);
    ```

### Cleanup Logic in `useEffect`

* **How it Works:** The `useEffect` hook's **return function** is the **cleanup function**. It runs *before* the component unmounts and *before* the effect runs again (if dependencies change).
* **In this App:** In the timer `useEffect`, `return () => clearInterval(interval);` is used. This is **critical** to prevent a **memory leak** and **incorrect behavior** (e.g., multiple timers running simultaneously) by ensuring the previous interval is stopped whenever the component state changes or when the component is unmounted.

### `useMemo` for Final Statistics

* **Location:** `useQuiz.js`
* **Hook Usage:** `useMemo` is used to calculate the `quizStatistics` object (score, percentage, correct/incorrect count).
    ```javascript
    const quizStatistics = useMemo(() => {
      // ... complex calculation
    }, [answers, questions.length]);
    ```
* **Why `useMemo`:** The calculation is potentially expensive (iterating over the `answers` array) and should only re-run if its dependencies (`answers` or `questions.length`) change. This prevents unnecessary recalculations during unrelated re-renders (like the timer updating every second), optimizing performance.

### Leaderboard

* **Component:** `src/components/Leaderboard.jsx`
* **Functionality:**
    1.  Uses a dedicated `useEffect` to call `getResults()` upon mounting.
    2.  The API call uses a query parameter (`?_sort=score&_order=desc`) to request the results already sorted by the highest score, minimizing client-side work.
    3.  Renders the results in a clean table format.

## 🎨 UI/UX Explanation (2024+ Design Standards)

The design adheres to modern standards for a **clean, elegant, and responsive** experience:

1.  **Card-Based Layout:** The primary content (Start, Question, Result, Leaderboard) is encapsulated in the reusable `Card.jsx` component. This provides visual separation, excellent use of **white-space**, and a defined focus area.
2.  **Modern Typography & Color:** Uses a clean sans-serif font (`Inter`) and a distinct, deep **Indigo** (`#5c6bc0`) as the primary accent color for a professional and engaging look.
3.  **Smooth Transitions:** The `Question.jsx` component uses a brief CSS transition (`opacity 0.3s ease-out, transform 0.3s ease-out`) to provide a **smooth exit animation** when an answer is selected, preventing a jarring instant change.
4.  **Progress Indicator:** The `ProgressBar.jsx` component provides a clear, highly visible indicator of the remaining time. It animates smoothly and even changes color to red when the time is running low, acting as a crucial **affordance**.
5.  **Responsiveness:** The layout uses a reasonable `max-width` on the main container and flexible box/grid layouts within components, ensuring it looks clean and functional on both desktop and mobile devices.
6.  **Hover/Active Animations:** Buttons, especially in the quiz section, feature subtle hover effects (background change, slight `translateY(-1px)`) to provide **instant visual feedback** to the user.