const mongoose = require("mongoose")

function getRandomInt() {
  return Math.floor(Math.random() * 1000000) + 1
}

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node monjo.js <password>"
  )
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://VRVG:${password}@cluster0.xojquvz.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const contactScheme = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Contact = mongoose.model("contact", contactScheme)
if (!number || !name) {
  console.log("No name or number given, print all data")
  Contact.find({}).then((result) => {
    console.log("Phonebook:")
    result.forEach((contact) => {
      console.log(contact.name + " " + contact.number)
    })
    mongoose.connection.close()
  })
} else {
  const contact = new Contact({
    name: name,
    number: number,
    id: getRandomInt(),
  })
  contact.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
