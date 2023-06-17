const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_list')
const api = supertest(app)
const User = require('../models/users')
const bcrypt = require('bcrypt')

describe('when there is initially one user saved', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('password', 10)
		await new User({ username: 'user', passwordHash }).save()
	})

	test('user is returned', async () => {
		const usersAtStart = await helper.usersInDb()

		expect(usersAtStart[0].username).toBe('user')
	})

	test('creating a new user succeeds', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'pendejo',
			name: 'estupido',
			password: 'password',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map((user) => user.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails if username is missing', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'name',
			password: 'password',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username and password are required')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails if password is missing', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'name',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username and password are required')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails if username is shorter than 3 characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'aa',
			name: 'name',
			password: 'password',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain(
			'username and password must be at least 3 characters long'
		)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails if password is shorter than 3 characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'aaaa',
			name: 'name',
			password: 'pa',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain(
			'username and password must be at least 3 characters long'
		)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})
afterAll(() => {
	mongoose.connection.close()
})
