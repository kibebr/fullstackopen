import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = ({text}) =>
{
    const [votes, setVotes] = useState(0);
    const [mostVoted, setMostVoted] = useState({_text: "", _votes: 0});

    function increaseVote(){
        const state = {...votes};
        state[text] = (state[text] || 0) + 1;  
        setVotes(state);
    }

    function renderMostVoted(){
        if(!mostVoted._votes)
            return (<p>nothing has been voted yet!</p>)
        else
            return (<p>{mostVoted._text} with {mostVoted._votes} votes!</p>)
    }

    useEffect(() => {
        for(let key in votes){
            if(votes[key] > mostVoted._votes){
                console.log("something is higher!");
                const dict = {_text: key, _votes: votes[key]};
                setMostVoted(dict);
            }
            console.log(mostVoted);
        }
    }, [votes]);

    return (
        <React.Fragment>
            <p>{text}</p>
            <p>Votes: {votes[text] || 0}</p>
            <h1>Most voted anecdote:</h1>
            {renderMostVoted()}
            <button onClick={() => increaseVote()}>vote</button>
        </React.Fragment>
    )
}

const App = (props) => 
{
  const [selected, setSelected] = useState(0);

  function randomizeAnecdote(){
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <br/>
      <button onClick={() => randomizeAnecdote()}>press</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)