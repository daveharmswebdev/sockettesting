'use strict'

const { Server } = require('http')
const express = require('express')
const app = express()
const { json } = require('body-parser')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const Message = require('../models/message')

const MONGODB_URL = 'mongodb://localhost:27017/davechat'
const port = process.env.PORT || 3000

const server = Server(app)
const io = socketio(server)

app.use(express.static('client'))
app.use(json())

app.get('/api/messages', (req, res, err) => {
	Message
		.find()
		.then( data => res.json(data))
		.catch(err)
})

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL)
	.then(() => {
		server.listen(port, () => {
			console.log('now listening on', port)
		})
	}) 

io.on('connection', socket => {
	console.log(`socket connected: ${socket.id}`)
	socket.on('disconnect', () => console.log(`socket disconnected: ${socket.id}`))
	socket.on('newMessage', message => {
		console.log('message recieved in the server', message)
		Message
			.create(message)
			.then( message => io.emit('publishMessage', message))
			.catch(console.error)
	})
})
