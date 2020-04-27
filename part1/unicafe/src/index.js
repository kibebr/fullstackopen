import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => 
{
    return (
        <h1>{title}</h1>
    )
}

const Button = ({text, handleClick}) => 
{
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = ({text, value, unit}) =>
{
    return <li>{text}: {value}{unit}</li>
}

const Statistics = ({feedbackList}) =>
{
    const statsQuantity = feedbackList.length;

    let total = 0;
    feedbackList.forEach(feedback => total += feedback);
    let average = total / statsQuantity;
    let positive = (100 * feedbackList[0]) / total;

    function renderStats(){
        if(total == 0){
            return <p>Leave your feedback to generate statistics</p>
        }
        else{
            return (
                <ul>   
                    <Statistic text="Total" value={total} />
                    <Statistic text="Average" value={average} />
                    <Statistic text="Positive" value={positive} unit="%" />
                </ul>
            )
        }
    }

    return (
        <React.Fragment>
            <Header title="Other statistics" />
            {renderStats()}
        </React.Fragment>
    )
}

const App = () => 
{
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <Header title="Your feedback:" />
            <ul>
                <li><Button text="good" handleClick={() => {setGood(good + 1);}}/></li>
                <li><Button text="neutral" handleClick={() => {setNeutral(neutral + 1);}}/></li>
                <li><Button text="bad" handleClick={() => {setBad(bad + 1);}}/></li>
            </ul>

            <div>
                <Header title="Statistics" />
                <ul>
                    <Statistic text="Good" value={good} />
                    <Statistic text="Neutral" value={neutral} />
                    <Statistic text="Bad" value={bad} />
                </ul>

                <Statistics feedbackList={[good, neutral, bad]} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)