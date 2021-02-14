import React, {useState} from 'react'
import Country from './Country'

const Countries = ({countries}) => {
    const [countryToShow, setCountry] = useState({})

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return (
        <div>
            { countries.map(country => 
                <div key={country.name}>
                    {country.name}
                    <button onClick={() => setCountry(country)}>show</button></div> 
                )}
            {countryToShow.languages !== undefined && <Country country={countryToShow} />}
        </div>
    )
}

export default Countries;