'use strict'

const app = angular.module('davechat', ['ngRoute'])

app.config(($routeProvider) => {
	$routeProvider
		.when('/', {
			controller: 'mainCtrl',
			templateUrl: 'partials/main.html'
		})
		.otherwise({
			redirect: '/'
		})
})