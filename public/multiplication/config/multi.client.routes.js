angular.module('multi').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/multiplication', {
			templateUrl: 'multiplication/views/multi.client.view.html'
		});
	}
]); 