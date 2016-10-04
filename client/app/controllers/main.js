'use strict'

app.controller('mainCtrl', function($scope, socketFactory) {

	socketFactory.on('connect', () => console.log(`socket connected ${socketFactory.id}`))
	// socketFactory.on('disconnect', console.log(`socket disconnected ${socketFactory.id}`))

	$scope.submitMessage = () => {
		const message = { 
			author: $scope.author,
			content: $scope.content
		}
		console.log('message', message)
	}
})