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
		expect(id).toBeDefined()
	})
})

// third test
test('a valid blog can be created', async () => {
	const newBlog = {
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		url: 'https://example.com/blog/the-great-gatsby',
		likes: 500
	}
    
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
    
	const blogInDB = await helper.blogsInDb()
	expect(blogInDB).toHaveLength((helper.manyBlogs.length + 1))
    

	const titles = blogInDB.map((blog) => blog.title)
	expect(titles).toContain('The Great Gatsby')
})

afterAll(async () => {
	await mongoose.connection.close()
})