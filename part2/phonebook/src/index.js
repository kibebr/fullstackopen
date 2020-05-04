import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {fetchFrom, JSON_SERVER_URL} from "./utils.js"
import {putPersonInServer, removePersonFromServer} from './services/persons.js';
import './index.css';
const shortid = require('shortid');

const SearchBar = ({filter}) =>
{
    return(
        <div>
            <h1>Search</h1>
            <input onChange={(event) => filter(event.target.value.toLowerCase())}/>
        </div>
    )
}

const PersonRow = ({person, deleteFunc}) =>
{
    return(
        <React.Fragment>
            <li key={person.id}>{person.name} -- phone: {person.phone}</li>
            <button onClick={() => deleteFunc(person)}>delete</button>
        </React.Fragment>
    )
}

const PersonsList = ({persons, deleteFunc}) => 
{
    function renderPersons(){
        const elements = [];

        persons.forEach(person => {
            if(person.show){
                elements.push(<PersonRow person={person} deleteFunc={deleteFunc}/>);
            }
        });

        return elements;
    }

    return(
        <ul>
            {renderPersons()}
        </ul>
    )
}

const PersonTable = ({sendMessage}) => 
{
    const [persons, setPersons] = useState([]);
    const [formInfo, setNewFormInfo] = useState({name: '', phone: ''});

    useEffect(() => {
        fetchFrom(JSON_SERVER_URL).then(initialPersons => {
            setPersons(initialPersons);
        });
    }, []);

    function addPerson(event){
        event.preventDefault();

        if(persons.some(person => person.name === formInfo.name)){
            return sendMessage("error", `${formInfo.name} is already added to the list!`);
        }
        else{       
            const newPerson = {
                id: shortid.generate(),
                name: formInfo.name,
                number: formInfo.phone,
                show: true
            }

            setPersons(persons.concat(newPerson));
            putPersonInServer(newPerson);
            sendMessage("success", `${newPerson.name} added!`);
        }
     }

    function deletePerson(person){
        setPersons(persons.filter(currperson => currperson !== person));

        removePersonFromServer(person.id);

        sendMessage("success", `${person.name} removed!`);
    }

    function filter(nameToFilter){
        if(nameToFilter === ''){
            setPersons((prev) => prev.map(person => ({...person, show:true})));
        }
        else{
            const filtered = [];
            persons.forEach(person => {
                if(!person.name.toLowerCase().includes(nameToFilter))
                    filtered.push({...person, show:false});
                else
                    filtered.push({...person});
            });
            setPersons(filtered);
        }
    }
 
    return (
        <div>
            <SearchBar filter={filter} />
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={(event) => setNewFormInfo({name: event.target.value, phone: formInfo.phone})}/>
                    <br/>
                    number: <input onChange={(event) => setNewFormInfo({name: formInfo.name, phone: event.target.value})}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Persons</h2>
            <PersonsList persons={persons} deleteFunc={deletePerson}/>
        </div>
    )
}

const Message = ({type, content, deleteMessageFunc}) =>
{
    useEffect(() => {
        setTimeout(() => {
            deleteMessageFunc();
        }, 10000);
    });

    if(type && content){
        return(
            <div className={`message message-${type}`}>
                {content}
            </div>
        )
    }
    else{
        return null;
    }
}

const App = (props) =>
{
    const [message, setMessage] = useState({type: '', content: ''});

    return(
        <div>
            <Message type={message.type} content={message.content} deleteMessageFunc={() => setMessage({type:'', content:''})}/>
            <PersonTable sendMessage={(type, content) => setMessage({type: type, content: content})}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))