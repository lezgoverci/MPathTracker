var DataCont = angular.module('DataCont', []);

/*DataCont.service('myService', function($http, $q){
	var deferred = $q.defer();
	$http.get('json/data.json').then(function(data){
		deferred.resolve(data);
	});
	
	this.getPlayers = function(){
		return deferred.promise;
	}
})*/

DataCont.controller('MyController', function($scope, $http)
{
	/*var promise = myService.getPlayers();
	promise.then(function(data){
		$scope.team = data;
		console.log($scope.team);
	})

	$scope.calculateData = function() {
		$http.get('json/data.json', {params: {"key1":"value","key2":"value2"}}).success(function(data){
			//$scope.mydata = data;
			$scope.myData = data;
			for(var i = 0; i < $scope.myData.length; i++){
				//$scope.myData = 
				$scope.direction = JSON.parse(data);
				console.log($scope.direction);
			}*/
			
			
			//var tStamp = data.timeStamp;
			//var direction = null;
			//var tStamp= null;
			//var alpha = null;
			//var beta = null;
			//var gamma = null;
			//console.log($scope.magneticHeading);
			
			//console.log(tStamp);
				
			
			//})
	//}
	
	var array = [
	{
		gyroAlpha:2,
		"gyroBeta":20,
		gyroGamma:1,
		timeStamp : .001,
		magneticHeading: 45.90	
	},
	{	
		gyroAlpha:2,
		"gyroBeta":22,
		gyroGamma:1, 
		timeStamp : .002, 
		magneticHeading: 1.90
		
	},
	{	
		gyroAlpha:2,
		"gyroBeta":23,
		gyroGamma:1, 
		timeStamp : .002, 
		magneticHeading: 1.90
		
	},
	{	
		gyroAlpha:2,
		"gyroBeta":26,
		gyroGamma:1, 
		timeStamp : .002, 
		magneticHeading: 1.90
		
	},
	{	
		gyroAlpha:2,
		"gyroBeta":21,
		gyroGamma:1, 
		timeStamp : .002, 
		magneticHeading: 1.90
		
	},
	{	
		gyroAlpha:2,
		"gyroBeta":23,
		gyroGamma:1, 
		timeStamp : .002, 
		magneticHeading: 1.90
		
	},
	{	
		gyroAlpha:2,
		"gyroBeta":28,
		gyroGamma:1, 
		timeStamp : .002, 
		magneticHeading: 1.90
		
	}];
myFunction(array);

//$scope.myFunction = function () {
		var direction = 0;//arr[i].magneticHeading;
		var tStamp = 0;//arr[i].timeStamp;
		
		var alpha = 0;//arr[i].gyroAlpha;
		var beta = 0;//arr[i].gyroBeta;
		var gamma = 0;//arr[i].gyroGamma;
function myFunction(arr){
	
	var minAngle = arr[0].gyroBeta;
	var maxAngle = arr[0].gyroBeta;
	//console.log(minAngle+ ' ' + maxAngle);
	for(var j = 0;j < arr.length; j++){
		//minAngle = arr[j].gyroBeta;
		var nextAngle = arr[j].gyroBeta;
		console.log(arr[j].gyroBeta)
		if (nextAngle > maxAngle){
			//minAngle = arr[i].gyroBeta;
			maxAngle = nextAngle;
			
			console.log(maxAngle);
			//console.log(maxAngle)
		} else {
			minAngle= arr[j].gyroBeta;
			maxAngle=arr[j].gyroBeta;
			console.log(minAngle);
			//console.log(minAngle)
		}
		console.log(minAngle +' '+ maxAngle)
	}


	 for(var i = 0; i < arr.length ; i++) {
					direction = arr[i].magneticHeading;
					tStamp = arr[i].timeStamp;
					
					alpha = arr[i].gyroAlpha;
					beta = arr[i].gyroBeta;
					gamma = arr[i].gyroGamma;
					
					//console.log(arr[i].magneticHeading);
					
					if (direction >= 337.6 && direction <= 22.5) {
						console.log("Direction: North, timeStamp: " +tStamp +" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+ "Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					
					else if (direction >= 22.6 && direction <= 67.5)	{
						console.log("Direction: North-East, timeStamp: "+"/t" + tStamp+" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					else if (direction >= 67.6 && direction <= 112.5) {
						console.log("Direction: East, timeStamp: " + tStamp+" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					else if (direction >= 112.6 && direction <= 157.5) {
						console.log("Direction: South-East, timeStamp: " +tStamp +" Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					else if (direction >= 157.6 && direction <= 202.5) {
						console.log("Direction: South, timeStamp: " + tStamp+" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					else if (direction >= 202.6 && direction <= 247.5) {
						console.log("Direction: South-West, timeStamp: " + tStamp +" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					else if (direction >= 247.6 && direction <= 292.5) {
						console.log("Direction: West, timeStamp: " + tStamp +" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
					else  {
						console.log("Direction: West, timeStamp: " +tStamp+" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+" Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
					}
				}
				
				function distTrav(gAlpha,gBeta,gGamma) {
					var resultant = Math.sqrt((gAlpha * gAlpha) + (gBeta * gBeta) + (gGamma * gGamma));
					var rad = (resultant) *((Math.PI)/180);
					var dist = (Math.sin(rad)) * 2.5;
					return dist;
				} 
	
	//var jsontest = JSON.parse(arr);
    //var out = "";
		
    
   
	
	
	function distTrav(gAlpha,gBeta,gGamma) {
		var resultant = Math.sqrt((gAlpha * gAlpha) + (gBeta * gBeta) + (gGamma * gGamma));
		var rad = (resultant) *((Math.PI)/180);
		var dist = (Math.sin(rad)) * 2.5;
		return dist;
	} 
    //document.getElementById("id01").innerHTML = out;
}
});
//}});
