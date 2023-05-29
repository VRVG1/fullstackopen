const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!(username && password)) {
    return response.status(400).json({
      error: 'username and password are required',
    })
  }

  if (username.length < 4 || password.length < 4) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// usersRouter.delete('/:id', async (request, response) => {
// 	await Blog.findByIdAndRemove(request.params.id)
// 	response.status(204).end()
// })

// usersRouter.put('/:id', async (request, response) => {
// 	const body = request.body

// 	const blogToUpdate = {
// 		title: body.title,
// 		author: body.author,
// 		url: body.url,
// 		likes: body.likes
// 	}

// 	const result = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
// 	result
// 		? response.status(200).json(result.toJSON())
// 		: response.status(404).end()
// })

module.exports = usersRouter
