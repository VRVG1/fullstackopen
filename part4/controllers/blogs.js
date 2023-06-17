const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


// Get all blogs
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})
// Get one blog
blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)

	if (blog) {
		response.json(blog.toJSON())
	} else {
		response.status(404).end()
	}
})
// Post one blog
blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const token = request.token
	const user = request.user

	const decodedToken = jwt.verify(token, config.SECRET)
	if (!(token && decodedToken.id)) {
		return response.status(401).json({ error: 'Token missing or invalid' })
	}

	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})
//Delete one blog
blogsRouter.delete('/:id', async (request, response) => {
	const token = request.token
	const user = request.user
	if (!(token)) {
		return response.status(401).json({ error: 'Token missing or invalid' })
	}

	const decodedToken = jwt.verify(token, config.SECRET)
	if (!(token && decodedToken.id)) {
		return response.status(401).json({ error: 'Token missing or invalid' })
	}

	const id = request.params.id
	const blog = await Blog.findById(id)

	if (blog.user.toString() === user.id.toString()) {
		await Blog.deleteOne({ _id: id })
		response.status(204).end()
	} else {
		response.status(401).json({ error: 'unauthorized operation'})
	}
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blogToUpdate = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
	result
		? response.status(200).json(result.toJSON())
		: response.status(404).end()
})

module.exports = blogsRouter
