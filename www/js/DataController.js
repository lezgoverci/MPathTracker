var DataCont = angular.module('DataCont', []);


DataCont.controller('MyController', function MyController($scope)
{
	
	
	var array = [
	{
		"gyroAlpha":123,
		"gyroBeta":123,
		"gyroGamma":123,
		"timeStamp" : .001,
		magneticHeading: 45.90	
	},
	{	
		"gyroAlpha":123,
		"gyroBeta":123,
		"gyroGamma":123, 
		"timeStamp" : .002, 
		magneticHeading: 1.90
	}];
myFunction(array);

//$scope.myFunction = function () {

function myFunction(arr){
	
	
	//var jsontest = JSON.parse(arr);
    //var out = "";
		var direction = 0;//arr[i].magneticHeading;
		var tStamp = 0;//arr[i].timeStamp;
		
		var alpha = 0;//arr[i].gyroAlpha;
		var beta = 0;//arr[i].gyroBeta;
		var gamma = 0;//arr[i].gyroGamma;
    
    for(var i = 0; i < arr.length; i++) {
		direction = arr[i].magneticHeading;
		tStamp = arr[i].timeStamp;
		
		alpha = arr[i].gyroAlpha;
		beta = arr[i].gyroBeta;
		gamma = arr[i].gyroGamma;
		
		console.log(arr[i].magneticHeading);
		
		if (direction >= 337.6 && direction <= 22.5) {
			document.write("Direction: North, timeStamp: </t>" +tStamp +"Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+ "Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
		
		else if (direction >= 22.6 && direction <= 67.5)	{
			document.write("Direction: North-East, timeStamp: "+"/t" + tStamp+" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+"Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
		else if (direction >= 67.6 && direction <= 112.5) {
			document.write("Direction: East, timeStamp: </a>" + tStamp+"Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+"Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
		else if (direction >= 112.6 && direction <= 157.5) {
			document.write("Direction: South-East, timeStamp: </a>" +tStamp +"Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+"Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
		else if (direction >= 157.6 && direction <= 202.5) {
			document.write("Direction: South, timeStamp: </a>" + tStamp+"Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+"Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
		else if (direction >= 202.6 && direction <= 247.5) {
			document.write("Direction: South-West, timeStamp: " + tStamp +"Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+'</a><br>')
		}
		else if (direction >= 247.6 && direction <= 292.5) {
			document.write("Direction: West, timeStamp: " + tStamp +"Angle-Alpha: " + alpha + "Angle-Beta: "+beta+ "Angle-Gamma: " +gamma+"Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
		else  {
			document.write("Direction: West, timeStamp: " +tStamp+" Angle-Alpha: " + alpha + " Angle-Beta: "+beta+ " Angle-Gamma: " +gamma+"Distance Travelled :"+distTrav(alpha,beta,gamma)+'</a><br>')
		}
    }
	
	
	function distTrav(gAlpha,gBeta,gGamma) {
		var resultant = Math.sqrt((gAlpha * gAlpha) + (gBeta * gBeta) + (gGamma * gGamma));
		var rad = (resultant) *((Math.PI)/180);
		var dist = (Math.sin(rad)) * 2.5;
		return dist;
	} 
    //document.getElementById("id01").innerHTML = out;
}
});

