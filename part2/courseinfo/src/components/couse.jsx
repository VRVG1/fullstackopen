import React from "react";
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
    return (
      <>
        <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
        <Part name={props.parts[3].name} exercises={props.parts[3].exercises} />
      </>
    );
  };
  /**import React from "react";
   * Total App
   * @param {*} props
   * @returns
   */
  const Total = (props) => {
    let total = 0;
    props.parts.map((item) => (total += item.exercises));
    return <p>Number of exercises {total}</p>;
  };

const Course = ({course}) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
        </div>
      );
}

export default Course