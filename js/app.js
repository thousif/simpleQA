var app = angular.module('app',[]);

app.controller('MainCtrl',function($scope){
	console.log("you are in the js now");
	$scope.stateOne = true;
	$scope.stateTwo = false;
	$scope.stateThree = false;

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

	$scope.next = function(){

	}

	$scope.previous = function(){

	}
})	