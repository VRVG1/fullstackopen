import React from "react";
import ReactDOM from "react-dom/client";

/**
 * App Header
 * @param {*} props
 * @returns
 **/
const Header = (props) => {
  return <h1>{props.course}</h1>;
};
/**
 * Refactor Content Component in to a Part component
 * @param {*} props
 * @returns JSX component
 **/
const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};
/**
 * App content
 * @param {*} props
 * @returns
 */
const Content = (props) => {
  let jsx = [];
  for (let i = 0; i < props.parts.length; i++) {
    const element = props.parts[i];
    jsx = jsx.concat(
      <Part key={i} name={element.name} exercises={element.exercises} />
    );
  }
  return jsx;
};
/**
 * Total App
 * @param {*} props
 * @returns
 */
const Total = (props) => {
  let total = 0;
  props.parts.map((item) => (total += item.exercises));
  return <p>Number of exercises {total}</p>;
};
/**
 * Main App
 **/
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
