angular.module('GyroControllers',['ngCordova'])
.controller('GyroReadingsController', function ($scope, $cordovaDeviceOrientation) {
    document.addEventListener("deviceready",
      $scope.startread = function(){
        $cordovaDeviceOrientation.getCurrentHeading().then(
            function(result){
                console.log(result.magneticHeading);
               },
            function(error){
            	console.log("samok error");
            }
            );

    },false);

});