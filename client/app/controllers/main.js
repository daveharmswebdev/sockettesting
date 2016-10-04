'use strict'

app.controller('mainCtrl', function($scope, $http, socketFactory) {

	$http
		.get('/api/messages')
		.then( ({data}) => $scope.messages = data)
		.catch(console.error)

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
		$scope.messages.push(message)
		$scope.$apply()
	})
})