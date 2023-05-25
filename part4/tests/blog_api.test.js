const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_list')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.manyBlogs)
})
// First test
test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

// second test 
test('blogs have id property named id instead of id', async () => {
	const response = await api.get('/api/blogs')
	const ids = response.body.map((blog) => blog.id)
    
	ids.forEach((id) => {
		console.log(id)
		expect(id).toBeDefined()
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})