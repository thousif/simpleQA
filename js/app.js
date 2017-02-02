var app = angular.module('app',['ui.router','ngRipple']);

app.config(function($stateProvider, $urlRouterProvider){
	 $urlRouterProvider.otherwise('start');

    $stateProvider
      .state('start', {
        url:'/start',
        templateUrl :'partials/start.html',
        controller:'mainCtrl'
      })
      .state('gameon', {
        url:'/gameon/:q',
        templateUrl :'partials/game.html',
        controller:'gameCtrl'
      })
      .state('result', {
        url:'/result',
        templateUrl :'partials/result.html'
      });
});
    
app.run(['rippleConfig', function(rippleConfig){
    rippleConfig.rippleOpacity = .6;
    rippleConfig.rippleDelay = 100;
    rippleConfig.mobileTouch = false; // False (default): Mobile use ONLY click || True: mobile use touchstart and touchend
}]);

app.controller('mainCtrl',function($scope,$stateParams){
	console.log("you are in the js now"); 

});

app.controller('gameCtrl',function($scope,$stateParams,$state,$timeout){
	console.log("you are in the js now"); 

	$scope.start = function(){
		$scope.stateOne = false;		
		console.log("lets start the code here");
	}

	$scope.questions = [{
		q : "select one!",
		options : ["1","2","3","4"],
		correct : 0
	},{
		q : "select two!",
		options : ["1","2","3","4"],
		correct : 1
	},{
		q : "select three!",
		options : ["1","2","3","4"],
		correct : 2
	},{
		q : "select four!",
		options : ["1","2","3","4"],
		correct : 3
	},{
		q : "select five!",
		options : ["1","2","3","5"],
		correct : 3
	}];

	$scope.index = $stateParams.q;
	$scope.current = $scope.questions[$scope.index];

	$scope.next = function(){
		console.log("next");
		$scope.index++; 
		$timeout(function(){
			$state.go('gameon',{'q':$scope.index});	
		},500);
	}

})		