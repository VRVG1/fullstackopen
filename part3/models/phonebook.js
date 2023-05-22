const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error to connecting to MongoDB: ", error.message)
  })

const validator = [
  {
    //length of number
    validator: (number) => {
      return number.length > 7
    },
    msg: "Must be at least 8 digits",
  },
  {
    // format of number
    validator: (number) => {
      return /^\d{2}-\d{7}$|^\d{3}-\d{8}$/.test(number)
    },
    msg: "Invalid number",
  },
]

const contactScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: validator,
  },
})
contactScheme.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true
  next()
})

contactScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model("Contact", contactScheme)
