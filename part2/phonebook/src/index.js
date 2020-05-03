import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Search = ({persons, filter}) =>
{
	const [name, setName] = useState(void 0);

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

const Persons = ({persons}) => 
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
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', phone: '040-123456', show: true },
	    { name: 'Ada Lovelace', phone: '39-44-5323523', show: true },
	    { name: 'Dan Abramov', phone: '12-43-234345', show: true },
	    { name: 'Mary Poppendieck', phone: '39-23-6423122', show:true }
	]);


  	const [ formInfo, setNewFormInfo ] = useState({name: '', phone: ''});

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
	    	const newobj = [];
	    	persons.forEach(person => {
	    		if(!person.name.toLowerCase().includes(nameToFilter))
	    			newobj.push({...person, show:false});
	    		else
	    			newobj.push({...person});
	    	});
	    	setPersons(newobj);
    	}
    }
 
  	return (
	    <div>
	  		<Search persons={persons} filter={filter} />
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
	      	<Persons persons={persons} />
	    </div>
	)
}

ReactDOM.render(<App />, document.getElementById("root"))
