const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Persons
