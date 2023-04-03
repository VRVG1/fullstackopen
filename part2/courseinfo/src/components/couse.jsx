import React from "react";
/**
 * App Header
 **/
const Header = ({title}) => {
    return <h1>{title}</h1>;
  };
/**
 * Refactor Content Component in to a Part component
 */
  const Part = ({name, exercises}) => {
    return (
        <p>
          {name} {exercises}
        </p>
    );
  };
  /**
   * App content
   */
  const Content = ({parts}) => {
    return (
      <div>
      {parts.map((part) => {
        return (<Part key={part.id} name={part.name} exercises={part.exercises} />)
      })}
      </div>
    );
  };
  /**import React from "react";
   * Total App
   */
  const Total = ({parts}) => {
    const total = parts.reduce((s, p) => {
        return s + p.exercises;
    }, 0)
    return <p>Number of exercises {total}</p>;
  };

/**
 * main component that is exported
 */
const Course = ({course}) => {
    return (
        <div>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      );
}

export default Course