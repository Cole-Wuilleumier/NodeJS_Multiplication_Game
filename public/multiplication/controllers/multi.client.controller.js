angular.module('multi').controller('MultiController', ['$scope', '$http', '$location', 'Socket',
    	function($scope, $http, $location, Socket) {

            $scope.startGame = function(){
                $scope.user_ready = true;
                Socket.emit('gameON', {});
            }

            Socket.on('gameON', function(){
                $scope.start = true;
            });

            $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $scope.secondNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $scope.answers = new Array(10);
            for (var i = 0; i < 10; i++) {
                $scope.answers[i] = new Array(10);
            }
            for(var x = 0; x<10; x++){
                for(var y = 0; y< 10; y++){
                    $scope.answers[x][y] = {answer:((x + 1) * (y+1)), correct:false};
                }
            }

            //Client accepts outside correct answers
            Socket.on('update_table', function(table) {
			    $scope.answers = table.table;
                $scope.users = table.current_users
		    });
            
            
            //Client sends answer
             $scope.check = function(){
                if(this.guess == this.snumber.answer){
                    this.snumber.correct = true;
                    Socket.emit('update_table', $scope.answers);
                }
            }; //End of logic updating board

            Socket.on('gameOver', function(current_users){
                $scope.gameOver = true;
            });



            //Disconnect and new connect logic
            $scope.$on('$destroy', function(){
			    Socket.removeListener('update_table');
		    });

            Socket.on("new_connection", function(conn_users){
                //A list of players in the room
                 $scope.users = conn_users; 
            });
        } 
    ]);