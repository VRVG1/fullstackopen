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
  //   let jsx = [];
  //   for (let i = 0; i < props.parts.length; i++) {
  //     const element = props.parts[i];
  //     jsx = jsx.concat(
  //       <Part key={i} name={element.name} exercises={element.exercises} />
  //     );
  //   }
  //   return jsx;
  return (
    <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );
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
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
