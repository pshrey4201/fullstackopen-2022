import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, setFilter }) => <>find countries <input value={filter} onChange={(event) => setFilter(event.target.value)} /></>

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      {country.capital.map(capital => <p key={capital}>capital {capital}</p>)}
      <p>area {country.area}</p>
      <p><strong>languages: </strong></p>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  )
}

const Countries = ({ countries, filter, }) => {
  const filteredList = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  if(filteredList.length > 10) return <p>Too many matches, specify another filter</p>

  if(filteredList.length > 1) return filteredList.map(country => <p key={country.name.official}>{country.name.common}</p>)

  return (
    <div>
      {filteredList.map(country => <Country key={country.name.official} country={country} />)}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

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
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App
