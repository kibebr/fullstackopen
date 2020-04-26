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
            <h1>{props.name}</h1>
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
    return (
        <div>
            <p>Total: {props.numExercises}</p>
        </div>
    )
}

class Course
{
    constructor(name){
        this.name = name;
        this.header = this.generateHeader();
        this.totalExercises = 0;
        this.parts = []; // stores an array of React components
    }

    generateHeader(){
        return React.createElement(Header, {name: this.name});
    }

    pushNewPart(name, exercises){
        const newPart = React.createElement(Part, {name: name, exercises: exercises});
        this.parts.push(newPart);
        this.totalExercises += exercises;
    }
}

const App = () => {
    const course1 = new Course("Half Stack application development");
    course1.pushNewPart("Fundamentals of React", 10);
    course1.pushNewPart("Using props to pass data", 7);
    course1.pushNewPart("State of a component", 14);

    return (
        <div>
            {course1.header}
            {course1.parts}
            <Total numExercises={course1.totalExercises} />
        </div>
    )
}   

ReactDOM.render(<App />, document.getElementById('root'))