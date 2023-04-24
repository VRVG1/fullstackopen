import { useState } from "react"
import Persons from "./components/Persons"
import Input from "./components/Input"

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
    console.log(persons)
    setPersonstoShow(
      persons.filter((person) => person.name.toLowerCase().includes(value))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Input
          label={"Filter shown with"}
          name={"filter"}
          onChange={handleOnChangeFilter}
          value={filterBy.name}
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          <Input
            label={"name"}
            name="name"
            onChange={handleOnChange}
            value={newName.name}
          />
        </div>
        <div>
          <Input
            label={"number"}
            name="number"
            onChange={handleOnChange}
            value={newName.number}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons personsToShow={personstoShow} />
    </div>
  )
}

export default App
