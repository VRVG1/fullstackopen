import { useState } from "react"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ])
  const [newName, setNewName] = useState({
    name: "",
    number: "",
  })

  const addPerson = (event) => {
    event.preventDefault()

    const nameAlready = persons.filter((person) => person.name === newName.name)
    if (nameAlready.length === 0) {
      setPersons(persons.concat(newName))
    } else {
      alert(`${newName.name} is already added to phonebook`)
    }
    setNewName({ name: "", number: "" })
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setNewName({ ...newName, [name]: value })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input name={"name"} onChange={handleOnChange} value={newName.name} />
        </div>
        <div>
          number:{" "}
          <input
            name={"number"}
            onChange={handleOnChange}
            value={newName.number}
          />
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
