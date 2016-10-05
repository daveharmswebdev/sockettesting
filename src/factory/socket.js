'use strict'

app.factory('socketFactory', function() {
	const socket = io()

	return socket
})