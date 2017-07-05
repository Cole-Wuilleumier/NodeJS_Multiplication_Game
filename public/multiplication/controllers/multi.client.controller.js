angular.module('multi').controller('MultiController', ['$scope', '$http', '$location', 'Socket',
    	function($scope, $http, $location, Socket) {
            

            $scope.startGame = function(){
                $scope.user_ready = true;
                Socket.emit('gameON', {});
            }

            Socket.on('gameON', function(){
                $scope.countDown = true;
                var countDownNum = 3;
                $scope.countDownNum = setInterval(function(){
                    if(countDownNum > 0){
                        return countDownNum;
                    } else {
                        clearInterval();
                        return "Go!";
                    }
                }, 1000);
               // $scope.countDownNum = "Go!";
               // $scope.countDown = false;
               // $scope.start = true;
            });

            //Client accepts an empty table with all table.answers.correct set to false
            Socket.on('create_table', function(table) {
			    $scope.answers = table.answers;
                $scope.room = table.room;
                $scope.users = [];
                for(var x = 0; x < table.current_users.length; x++){
                    if(table.current_users[x].room == $scope.room){
                        $scope.users.push(table.current_users[x]);
                    }
                }
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
                for(var x = 0; x < table.current_users.length; x++){
                        for(var y = 0; y < $scope.users.length; y++){
                            if($scope.users[y].id == table.current_users[x].id)
                            {
                                $scope.users[y] = table.current_users[x];
                            }
                        }
                }
                $scope.users.sort(function(a,b) {return (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);} );
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