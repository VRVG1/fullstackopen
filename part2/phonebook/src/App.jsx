import { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/filter"
import PersonForm from "./components/PersonForm"
import Message from "./components/Message"

// services
import personsServices from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [personstoShow, setPersonstoShow] = useState([])
  const [newName, setNewName] = useState({ name: "", number: "" })
  const [filterBy, setFilterBy] = useState({ name: "" })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsServices.getAll().then((response) => {
      setPersons(response)
      setPersonstoShow(response)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  const addPerson = (event) => {
    event.preventDefault()

    const nameAlready = persons.filter((person) => person.name === newName.name)
    if (nameAlready.length === 0) {
      personsServices
        .create(newName)
        .then((response) => {
          setPersons(persons.concat(response))
          setPersonstoShow(persons.concat(response))
          setMessage(`Added ${newName.name}`)
        })
        .catch((error) => {
          setMessage(`failed add ${newName.name}`)
        })
    } else {
      if (
        window.confirm(
          `${nameAlready} is already added to phonebook, replace old number with new one?`
        )
      ) {
        personsServices.update(nameAlready[0].id, newName).then((response) => {
          const updatePersons = persons.map((person) => {
            return person.id !== response.id ? person : response
          })
          setPersons(updatePersons)
          setPersonstoShow(updatePersons)
          setMessage(`Updated ${newName.name}'s number`)
        })
      }
    }
    setNewName({ name: "", number: "" })
  }

  const deletePerson = (id, name) => {
    if (
      window.confirm(`Are you sure you want to delete ${name} from phonebook?`)
    ) {
      personsServices.remove(id).then((response) => {
        const updatePersons = persons.filter((persons) => persons.id !== id)
        setPersons(updatePersons)
        setPersonstoShow(updatePersons)
        setMessage(`Removed ${name} from phonebook`)
      })
    }
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
      <Message message={message} />
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
      <Persons personsToShow={personstoShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
