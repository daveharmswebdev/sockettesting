'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('message', {
	author: String,
	content: String
})