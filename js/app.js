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
        templateUrl :'partials/result.html',
        controller:'resultCtrl'
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

app.factory('store',function(){
	var scoreCard = {};
	var questions = [{
		q : "which planet are you from ?",
		options : ["Earth","Mars","Pluto","Mercury"],
		correct : 0
	},{
		q : "which one is a star ?",
		options : ["milkyway","sun","earth","saturn"],
		correct : 1
	},{
		q : "Whats the atomic number of helium ? ",
		options : ["1","4","16","2"],
		correct : 3
	},{
		q : "India is in which continent ?",
		options : ["Australia","Europe","Asia","Africa"],
		correct : 2
	},{
		q : "how many hours are their in a day?",
		options : ["36","16","18","24"],
		correct : 3
	}];
	var storeScore = function(index,score){
		scoreCard[index] = score;
	}
	
	var	isEmpty = function(obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }
		return JSON.stringify(obj) === JSON.stringify({});
	}

	var getScoreCard = function(){
		if(isEmpty(scoreCard)){
			return false;
		}
		return scoreCard;
	}
	var getQuestions = function(){
		return questions;
	}
	return{
		storeScore : storeScore,
		getQuestions : getQuestions,
		getScoreCard : getScoreCard
	}
})

app.controller('gameCtrl',function($scope,$stateParams,$state,$timeout,store){
	console.log("you are in the js now"); 

	$scope.start = function(){
		$scope.stateOne = false;		
		console.log("lets start the code here");
	}

	$scope.questions = store.getQuestions();
	$scope.q = {};
	$scope.q.curr = parseInt($stateParams.q, 10) + 1;
	$scope.q.next = parseInt($scope.q.curr, 10) + 1;
	if($scope.q.curr < 2){
		$scope.q.prev = "";	
	} else if($scope.q.curr == $scope.questions.length) {
		$scope.q.next = "";
		$scope.q.prev = $scope.q.curr - 1;
	} else {
		$scope.q.next = $scope.q.curr + 1;
		$scope.q.prev = $scope.q.curr - 1;	
	}
	
	$scope.index = $stateParams.q;
	$scope.current = $scope.questions[$scope.index];
	$scope.selectedAns = {};
	$scope.showResults = false;
	$scope.disable = false;

	$scope.next = function(option){
		$scope.disable = true;
		store.storeScore($scope.index,option);
		$scope.index++;
		if(!$scope.questions[$scope.index]){
			$state.go('result');
			return;
		} 
		$timeout(function(){
			$state.go('gameon',{'q':$scope.index});	
		},500);
		console.log(store.getScoreCard());
	}

});

app.controller('resultCtrl',function($scope,$timeout,store,$state){
	$scope.showResultsBtn = true;
	$scope.showResults = function(){
		$timeout(function() {
			$scope.showResultsBtn = false;	
		}, 500);
	}
	$scope.xAxis = 'Marks';    
    $scope.yAxis = 'Questions';
    $scope.points = [];

    $scope.questions = store.getQuestions();
    $scope.userAnswers = store.getScoreCard();
    $scope.score = 0;

    console.log($scope.userAnswers);
    if(!$scope.userAnswers){
    	$state.go('start');
    } else {
    	for(var i=0;i<$scope.questions.length;i++){
	    	var q;    	
	    	if($scope.userAnswers[i] == $scope.questions[i].correct){
	    		$scope.score += 10;
	    		console.log($scope.score);
	    		q = {
	    			label  : 'Question :' + (i+1), 
	    			xValue : 10,
	    			yValue : i+1
	    		}
	    		$scope.points.push(q);
	    	} else {
	    		q = {
	    			label  : 'Question :' + (i+1), 
	    			xValue : 1,
	    			yValue : i+1
	    		}
	    		$scope.points.push(q);
	    	}
	    }
    }

    
    // Find Maximum X & Y Axis Values - this is used to position the points as a percentage of the maximum
    $scope.maxX = 10;
    $scope.maxY = 0;
    
    var arrLength = $scope.points.length;
    for (var i = 0; i < arrLength; i++) {
        // Find Maximum X Axis Value
      	if ($scope.points[i].xValue > $scope.maxX)
        $scope.maxX = $scope.points[i].xValue;
      	// Find Maximum Y Axis Value
      	if ($scope.points[i].yValue > $scope.maxY)
        $scope.maxY = $scope.points[i].yValue;
    }

});		

