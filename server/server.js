'use strict'

const { Server } = require('http')
const express = require('express')
const app = express()
const { json } = require('body-parser')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const MONGODB_URL = 'mongodb://localhost:27017/davechat'
const port = process.env.PORT || 3000

const server = Server(app)
const io = socketio(server)

app.use(express.static('client'))
app.use(json())

app.get('/', (req, res) => {
	res.json({ response: 'hello world' })
})

mongoose.connect(MONGODB_URL)
	.then(() => {
		server.listen(port, () => {
			console.log('now listening on', port)
		})
	}) 

