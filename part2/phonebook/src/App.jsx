import { useState } from "react"
import Persons from "./components/Persons"
import Filter from "./components/filter"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ])
  const [personstoShow, setPersonstoShow] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ])
  const [newName, setNewName] = useState({
    name: "",
    number: "",
  })

  const [filterBy, setFilterBy] = useState({
    name: "",
  })

  const addPerson = (event) => {
    event.preventDefault()

    const nameAlready = persons.filter((person) => person.name === newName.name)
    if (nameAlready.length === 0) {
      setPersons(persons.concat(newName))
      setPersonstoShow(persons.concat(newName))
    } else {
      alert(`${newName.name} is already added to phonebook`)
    }
    setNewName({ name: "", number: "" })
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setNewName({ ...newName, [name]: value })
  }

  const handleOnChangeFilter = (event) => {
    const { value } = event.target
    setFilterBy({ name: value })
    setPersonstoShow(
      persons.filter((person) => person.name.toLowerCase().includes(value))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterBy={filterBy} handleOnChangeFilter={handleOnChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleOnChange={handleOnChange}
        value1={newName.name}
        value2={newName.number}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personstoShow} />
    </div>
  )
}

export default App
