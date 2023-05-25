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
describe('when there is initially some blogs saved', () => {
	// test 1
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
    
	// test 2
	test('blogs have id property named id instead of id', async () => {
		const response = await api.get('/api/blogs')
		const ids = response.body.map((blog) => blog.id)
        
		ids.forEach((id) => {
			expect(id).toBeDefined()
		})
	})
})

describe('when a new blog is created', () => { 
	// test 3
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
    
	// test 4
	test('likes property defaults to 0 if missing', async () => {
		const newBlog = {
			title: 'The Great Gatsby',
			author: 'F. Scott Fitzgerald',
			url: 'https://example.com/blog/the-great-gatsby',
		}
        
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
        
		const blogInDB = await helper.blogsInDb()
		expect(blogInDB).toHaveLength((helper.manyBlogs.length + 1))
		expect(blogInDB[blogInDB.length - 1].likes).toBe(0)
	})
    
	//test 5
	test('url and title is required', async () => {
		const newBlog = {
			author: 'F. Scott Fitzgerald',
		}
        
		await api
			.post('/api/blog')
			.send(newBlog)
			.expect(404)
    
		const blogInDB = await helper.blogsInDb()
		expect(blogInDB).toHaveLength(helper.manyBlogs.length)
	})
})

describe('when a blogs is deleted', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.manyBlogs)
	})
    
	test('success with status 204 if is valid id', async () => {
		const blogsAtStart = await Blog.find({})
		const blogToRemove = blogsAtStart[0]
		await api
			.delete(`/api/blogs/${blogToRemove.id}`)
			.expect(204)
		const blogsAtEnd = await Blog.find({})
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    
		const titles = blogsAtEnd.map((blog) => blog.title)
		expect(titles).not.toContain(blogToRemove.title)

	})
})


afterAll(async () => {
	await mongoose.connection.close()
})