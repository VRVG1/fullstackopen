import { useState } from 'react'

const Persons = ({personsToShow}) => {

  return (
    <div>
      <ul>
      {personsToShow.map((person) => {
        return (<li key={person.name}>{person.name}</li>)
      })}
      </ul>
    </div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    }
    
    const nameAlready = persons.filter(
      (person) => person.name === newPerson.name
    )
    if (nameAlready.length === 0) {
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    setNewName('')
  }

  const handleOnChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleOnChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons personsToShow={persons} />
    </div>
  )
}

export default App
