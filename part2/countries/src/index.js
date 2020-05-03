import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {fetchFrom} from "./utils.js";

const SearchBar = ({filterFunc}) => 
{
    return(
        <React.Fragment>
            <h1>Search</h1>
            <input onChange={(event) => filterFunc(event.target.value.toLowerCase())}/>
        </React.Fragment>
    )
}

const CountryExpandedInfo = ({country, shouldShow}) => 
{
    function renderInfo(){
        if(shouldShow){
            return(
                <React.Fragment>
                    <h2>{country.name}</h2>
                    <ul>
                        <li>Capital: {country.capital}</li>
                        <li>Population: {country.population}</li>
                    </ul>
                    <h2>Languages:</h2>
                    <ul>
                        {country.languages.map(language => <li>{language.name}</li>)}
                    </ul>
                    <br/>
                    <img src={country.flag}/>
                </React.Fragment>
            )
        }
        else{
            return null;
        }
    }

    return(
        <React.Fragment>
            {renderInfo()}
        </React.Fragment>
    )
}

const CountryComponent = ({country}) => 
{
    const [showInfo, setShowInfo] = useState(false);

    return (
        <React.Fragment>
            <li>{country.name}</li>
            <button onClick={() => setShowInfo(!showInfo)}>info</button>
            <br/>
            <CountryExpandedInfo country={country} shouldShow={showInfo} />
        </React.Fragment>
    )
}

const CountryList = ({countries, filter}) => 
{
    function renderCountries(){
        if(!filter)
            return countries.map(country => <CountryComponent country={country} />)

        const filtered = countries.filter(country => country.name.toLowerCase().includes(filter))

        if(filtered.length < 10){
            return filtered.map(country => <CountryComponent country={country} />);
        }
        else{
            return <p>too many matches, specify another filter</p>
        }
    }

    return (
        <ul>
            {renderCountries()}
        </ul>
    )
}

const App = () => 
{
    const [countries, setCountries] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetchFrom("https://restcountries.eu/rest/v2/all").then(allCountries => {
            setCountries(allCountries);
        });
    }, []);

    return (
        <div>
            <SearchBar filterFunc={setFilterText}/>
            <CountryList countries={countries} filter={filterText}/>
        </div>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);