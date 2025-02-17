import { useState } from 'react'
import CountryDetails from "./CountryDetails"

const CountriesList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const showCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      {selectedCountry 
        ? <CountryDetails country={selectedCountry} />
        : countries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => showCountry(country)}>show</button>
            </div>
          )
        )
      }
    </div>
  )
}

export default CountriesList