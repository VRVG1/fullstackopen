const Countries = ({ countries }) => {
  return countries.map((country) => (
    <div key={country.name.official}>{country.name.common}</div>
  ))
}

export default Countries
