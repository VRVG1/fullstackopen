import axios from "axios"
import { useState, useEffect } from "react"
import Countries from "./components/Countries"
import CountryInfo from "./components/CountryInfo"

function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [filter, setFilter] = useState([])
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })

    return () => {}
  }, [])

  const onChangeHandler = (event) => {
    const value = event.target.value
    setFilter(value)
    setCountriesToShow(
      countries.filter((countrie) =>
        countrie.name.common.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <div>
        Find countries
        <input
          type="text"
          name="filtro-countries"
          value={filter}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        {countriesToShow.length === 1 ? (
          <CountryInfo country={countriesToShow[0]} />
        ) : null}
        {countriesToShow.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : (
          <div>
            <Countries
              countries={countriesToShow}
              setCountriesToShow={setCountriesToShow}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
