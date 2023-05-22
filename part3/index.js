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

app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch((error) => {
    next(error)
  })
})

app.post("/api/persons", bodyParser.json(), (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and number are required",
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then((savedContact) => {
    response.json(savedContact)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorhandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" })
  }
  next(error)
}

app.use(errorhandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
