import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
    return (
            <li>Name: {props.part} - Exercises: {props.exercises}</li>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <ul>
            {props.content}
        </ul>
    )
}

const Total = (props) => {
    let sum = 0;
    props.content.forEach(part => sum += part.props.exercises);

    return (
        <div>
            <p>Total: {sum}</p>
        </div>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const courseContent = [React.createElement(Part, {name: "Fundaments of React", exercises: 10}),
                         React.createElement(Part, {name: "Using props to pass data", exercises: 7}),
                         React.createElement(Part, {name: "State of a component", exercises: 14})];
  return (
    <div>
      <Header course={course} />
      <Content content={courseContent} />
      <Total content={courseContent} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))