import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};
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
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
/**
 * Component that contains StatisticLine
 * @param {*} param0
 * @returns
 */
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"Good"} value={good} />
        <StatisticLine text={"Neutral"} value={neutral} />
        <StatisticLine text={"Bad"} value={bad} />
        <StatisticLine text={"All"} value={total} />
        <StatisticLine text={"Average"} value={average} />
        <StatisticLine text={"Positive"} value={positive + "%"} />
      </tbody>
    </table>
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

  const setValueGood = (good) => {
    setGood(good);
  };

  const setValueNeutral = (neutral) => {
    setNeutral(neutral);
  };

  const setValueBad = (bad) => {
    setBad(bad);
  };
  return (
    <div>
      <Heading text={"Give feedback"} />
      <Button onClick={() => setValueGood(good + 1)} text={"Good"} />
      <Button onClick={() => setValueNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setValueBad(bad + 1)} text={"bad"} />
      <Heading text={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
