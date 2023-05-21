const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Contact = require("./phonebook")
require("dotenv").config()

// Forntend
app.use(express.static("build"))

/**
 * Custom token for morgan
 */
morgan.token("body", (request) => JSON.stringify(request.body))

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)
app.use(cors())
const generateId = () => {
  return Math.floor(Math.random() * 1000000) + 1
}

/**
 * Retrieve all persons from the server and return them as a JSON response
 */
app.get("/api/persons", (request, response) => {
  //response.json(persons)
  Contact.find({}).then((persons) => {
    response.json(persons)
  })
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
  // const id = Number(request.params.id)
  // const person = persons.filter((person) => person.id === id)
  // person ? response.json(person) : response.status(404).end()
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", bodyParser.json(), (request, response) => {
  // const body = request.body
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "name and number are required",
  //   })
  // }
  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name already in phonebook",
  //   })
  // }
  // if (persons.find((person) => person.number === body.number)) {
  //   return response.status(400).json({
  //     error: "number already in phonebook",
  //   })
  // }
  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: generateId(),
  // }
  // persons = persons.concat(person)
  // response.json(person)
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and number are required",
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

  contact.save().then((savedContact) => {
    response.json(savedContact)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
