import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, setFilter }) => <>find countries <input value={filter} onChange={(event) => setFilter(event.target.value)} /></>

const Weather = ({ country, capital, weather, setWeather, api_key }) => {
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=imperial`)
      .then(response => {
        let temp = {
          ...weather
        }
        temp.temp = response.data.main.temp
        temp.wind = response.data.wind.speed
        temp.icon = response.data.weather[0].icon
        setWeather(temp)
      })
  }, [])

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>temperature {weather.temp} Fahrenheit</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}></img>
      <p>wind speed {weather.wind} mph</p>
    </div>
  )
}


const Country = ({ country, api_key, weather, setWeather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      {country.capital && country.capital.map(capital => <p key={capital}>capital {capital}</p>)}
      <p>area {country.area}</p>
      <p><strong>languages: </strong></p>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png}></img>
      {country.capital && country.capital.map(capital => {
          return <Weather key={capital} country={country} capital={capital} weather={weather} setWeather={setWeather} api_key={api_key} />
        })
      }
    </div>
  )
}

const Countries = ({ countries, filter, setFilter, api_key, weather, setWeather }) => {
  const filteredList = countries.filter(country => (country.name.common.toLowerCase().includes(filter.toLowerCase()) || (country.name.official.toLowerCase() === filter.toLowerCase())))
  if(filteredList.length > 10) return <p>Too many matches, specify another filter</p>

  if(filteredList.length > 1) {
    return (
      filteredList.map(country => {
            return (
              <div key={country.cca3}>
                {country.name.common} <button key={country.name.official} onClick={() => setFilter(country.name.official)}>show</button>
              </div>
            )
      })
    )
  }

  return (
    <div>
      {filteredList.map(country => <Country key={country.name.official} country={country} api_key={api_key} weather={weather} setWeather={setWeather} />)}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({
    temp: '',
    wind: '',
    icon: ''
  })
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries countries={countries} filter={filter} setFilter={setFilter} api_key={api_key} weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default App
