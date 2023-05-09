const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id, person.name)}>
                delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Persons
