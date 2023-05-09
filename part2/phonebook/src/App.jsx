import { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/filter"
import PersonForm from "./components/PersonForm"
import axios from "axios"

// services
import personsServices from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [personstoShow, setPersonstoShow] = useState([])
  const [newName, setNewName] = useState({ name: "", number: "" })
  const [filterBy, setFilterBy] = useState({ name: "" })

  useEffect(() => {
    personsServices.getAll().then((response) => {
      setPersons(response)
      setPersonstoShow(response)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameAlready = persons.filter((person) => person.name === newName.name)
    if (nameAlready.length === 0) {
      personsServices
        .create(newName)
        .then((response) => {
          setPersons(persons.concat(response))
          setPersonstoShow(persons.concat(response))
        })
        .catch((error) => {
          console.error(error)
        })
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
