const Countries = ({ countries, setCountriesToShow }) => {
  if (countries.length === 1) return null
  return countries.map((country) => (
    <div key={country.name.official}>
      {country.name.common}
      <button
        onClick={() => {
          setCountriesToShow([country])
        }}
      >
        show
      </button>
    </div>
  ))
}

export default Countries
