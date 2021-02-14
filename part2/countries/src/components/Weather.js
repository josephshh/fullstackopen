import React , { useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})
    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => setWeather(response.data.current))
    }

    useEffect(hook, [api_key, capital])

    if (weather) {
        return (
            <div>
                <p><b>temperature:</b> {weather.temperature} Celsius</p>
                <img src={weather.weather_icons} alt="weather icon" />
                <p><b>wind:</b> {weather.wind_speed} kph direction {weather.wind_dir}</p>
            </div>
            )
    } else {
        return <p>weather not available</p>
    }
}

export default Weather
