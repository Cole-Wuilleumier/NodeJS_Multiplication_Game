angular.module('home').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'home/views/home.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]); 