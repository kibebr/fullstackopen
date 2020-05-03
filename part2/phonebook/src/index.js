import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {fetchFrom} from "./utils.js";

const SearchBar = ({persons, filter}) =>
{
    function search(event){
        event.preventDefault();
        filter(event.target.value.toLowerCase());
    }

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={search}>
                <input onChange={(event) => search(event)}/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

const PersonsList = ({persons}) => 
{
    function renderPersons(){
        const elements = [];

        persons.forEach(person => {
            if(person.show){
                elements.push(<li>{person.name} -- his/her telephone number: {person.phone}</li>);
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

const App = () => 
{
    const [ persons, setPersons ] = useState([]);
    const [ formInfo, setNewFormInfo ] = useState({name: '', phone: ''});


    useEffect(() => {
        fetchFrom("http://localhost:3001/persons").then(initialPersons => {
            setPersons(initialPersons);
        })
    }, []);

    function addPerson(event){
        event.preventDefault();

        let able = true;

        persons.forEach(person => {
            if(person.name == formInfo.name)
                able = false;       
        });

        if(able)
            setPersons(persons.concat({name:formInfo.name, phone:formInfo.phone, show:true}));
        else
            alert(`${formInfo.name} is already added to the list!`);
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
            <PersonsList persons={persons} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))
