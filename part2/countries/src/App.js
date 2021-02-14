import logo from './logo.svg';
import './App.css';
import Countries from './components/Countries'
import React , { useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {setCountries(response.data)})
  }

  useEffect(hook, [])

  const countriesToShow = filter 
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App;