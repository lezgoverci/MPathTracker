var findStart = angular.module('findStart', []);

findStart.controller('findStartController', function($scope){

//{d:123,t:123:h:N}
//d - distance
//t - time in seconds
//h - heading(compass)

	$scope.data = [
	{
		d:123,
		t:123,
		h:"N"
	},
	{
		d:321,
		t:123,
		h:"N"
	},
	];
	
	
});