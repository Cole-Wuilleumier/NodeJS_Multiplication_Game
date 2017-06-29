angular.module('user').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/login', {
			templateUrl: 'user/views/login.client.view.html'
		});
	}
]); 