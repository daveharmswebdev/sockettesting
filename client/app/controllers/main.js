'use strict'

app.controller('mainCtrl', function($scope, $http, socketFactory) {

	$http.get('/api/messages')

	socketFactory.on('connect', () => console.log(`socket connected ${socketFactory.id}`))

	$scope.submitMessage = () => {
		const message = { 
			author: $scope.author,
			content: $scope.content
		}
		socketFactory.emit('newMessage', message)
	}

	socketFactory.on('publishMessage', message => {
		console.log('publishMessage', message)
	})
})