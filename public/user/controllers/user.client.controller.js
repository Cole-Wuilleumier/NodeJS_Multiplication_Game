angular.module('user').controller('UserController', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
            $scope.users = [];
            $scope.login = function(){
                if($scope.users.includes($scope.formData.name)){
                    $location.path('/login');
                }
                else {
                    $scope.users.push($scope.formData.name);
                    $http.post('/login', $scope.formData).
                        success(function(data){
                            $location.path('/multiplication');  
                         }).
                        error(function(data) {
                            console.log("Error in posting");
                        })  
                    };
                }
    }]);