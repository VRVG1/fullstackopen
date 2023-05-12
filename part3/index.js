const express = require("express")
const app = express()
const bodyParser = require("body-parser")

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
]

const generateId = () => {
  return Math.floor(Math.random() * 1000000) + 1
}

/**
 * Retrieve all persons from the server and return them as a JSON response
 */
app.get("/api/persons", (request, response) => {
  response.json(persons)
})

/**
 * Return information about the phonebook, including the number of people and the current date
 */
app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>
  `)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter((person) => person.id === id)
  person ? response.json(person) : response.status(404).end()
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", bodyParser.json(), (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const person = {
    name: body.name,
    number: "39-23-6423122",
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})
/**
 * Set the server to listen on port 3001 and log a message to the console when it starts running
 */
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})