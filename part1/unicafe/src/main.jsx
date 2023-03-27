import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const Statistics = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setValueGood = () => {
    setGood(good + 1);
  };

  const setValueNeutral = () => {
    setNeutral(neutral + 1);
  };

  const setValueBad = () => {
    setBad(bad + 1);
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
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
