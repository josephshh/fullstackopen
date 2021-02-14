import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'

const flagStyle = {
    width : "180px"
}

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="" style={flagStyle}/>
            <h3>weather in {country.capital}</h3>
            <Weather capital={country.capital}/>
        </div>
    )
}

export default Country
