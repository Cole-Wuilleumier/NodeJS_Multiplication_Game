angular.module('multi').controller('MultiController', ['$scope', '$http', '$location', 'Socket',
    	function($scope, $http, $location, Socket) {

            $scope.startGame = function(){
                $scope.user_ready = true;
                Socket.emit('gameON', {});
            }

            Socket.on('gameON', function(){
                $scope.start = true;
            });

            //Client accepts an empty table with all table.answers.correct set to false
            Socket.on('create_table', function(table) {
			    $scope.answers = table.answers;
                $scope.users = table.current_users
		    });
            
            
            //Client sends answer
            $scope.check = function(){
                   if(this.guess == this.snumber.answer){
                    this.snumber.correct = true;
                    Socket.emit('update_table', $scope.answers);
                    }
               };

            Socket.on('update_table', function(table) {
                for(var i = 0; i < table.answers.length; i++)
                {
                    var answer = table.answers[i];
                    for(var x = 0; x < answer.length; x++){
                        if(answer[x].correct != $scope.answers[i][x].correct){
                            $scope.answers[i][x].correct = true;
                        }
                    }
                }
                $scope.users = table.current_users
		    });



            //End of logic updating board

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