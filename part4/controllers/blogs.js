const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blog = await Blog.find({})
	response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
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