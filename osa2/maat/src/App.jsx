import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountriesList'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filterCountry, setFilterCountry] = useState('')
  
  useEffect(() => {
    console.log('fetching data from server')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  if (!countries) {
    return null
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterCountry(event.target.value)
  }

  const countriesToShow = filterCountry === ''
    ? countries
    : countries.filter(country => 
      country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
    )

  return (
    <div>
      <Filter
        value={filterCountry}
        onChange={handleFilterChange}
      />
      {countriesToShow.length > 10 
        ? <div>Too many matches, specify another filter</div>
        : countriesToShow.length === 1 
          ? <CountryDetails country={countriesToShow[0]} />
          : <CountryList countries={countriesToShow} />
      }
    </div>
  )
}

export default App