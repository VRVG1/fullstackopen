import React, { useState } from "react";
import ReactDOM from "react-dom/client";

/**
 * Component Button
 * @param {*} param0
 * @returns
 */
const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};
/**
 * Componen Statistics to display text information
 * @param {*} param0
 * @returns
 */
const Statistics = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};
/**
 * Main Component
 * @returns
 */
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const setValueAvarage = () => {
    setAll(all + 1);
  };
  const setValueGood = () => {
    setGood(good + 1);
    setValueAvarage();
  };

  const setValueNeutral = () => {
    setNeutral(neutral + 1);
    setValueAvarage();
  };

  const setValueBad = () => {
    setBad(bad + 1);
    setValueAvarage();
  };
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setValueGood()} text={"Good"} />
      <Button onClick={() => setValueNeutral()} text={"neutral"} />
      <Button onClick={() => setValueBad()} text={"bad"} />
      <h1>Statistics</h1>
      <Statistics text={"Good"} value={good} />
      <Statistics text={"Neutral"} value={neutral} />
      <Statistics text={"Bad"} value={bad} />
      <Statistics text={"All"} value={all} />
      <Statistics
        text={"Average"}
        value={all === 0 ? "0" : Math.abs(good - bad) / all}
      />
      <Statistics
        text={"Positive"}
        value={all === 0 ? "0%" : (good * 100) / all + "%"}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
