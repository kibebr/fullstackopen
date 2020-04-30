import React from 'react';
import ReactDOM from 'react-dom';
const shortid = require("shortid");

const Course = ({name, parts}) => 
{
    let totalExercises = Object.values(parts).reduce((sum, {exercises}) => sum + exercises, 0);

    return(
        <React.Fragment>
            <h1>{name}</h1>
            <ul>    
                {parts.map(part => 
                    <li key={shortid.generate()}> {part.name} -- exercises: {part.exercises}</li>
                )}
            </ul>
            <h3>TOTAL OF EXERCISES: {totalExercises}</h3>
        </React.Fragment>
    )
};

export default Course