const logger = require('./logger')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('./config')
const requestLogger = (request, response, next) => {
	logger.info('Method: ' + request.method)
	logger.info('Path: ' + request.path)
	logger.info('body: ' + response.body)
	logger.info('------------------------')
	next()

}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' })
	}

	logger.error(error.message)

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const auth = request.get('authorization')
	if (auth && auth.startsWith('bearer ')) {
		request.token = auth.replace('bearer ', '')
	}
	next()
}

const userExtractor = async (request, response, next) => {
	const token = request.token
	if (token) {
		const decodedToken = jwt.verify(token, config.SECRET)
		const user = await User.findById(decodedToken.id)
		request.user = user
	}

	next()
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	requestLogger,
	tokenExtractor,
	userExtractor
}