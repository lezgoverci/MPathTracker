var gyroModule = angular.module('GyroControllers',['ngCordova'])
.controller('GyroReadingsController',function ($scope,$rootScope, Gyro) {
    document.addEventListener("deviceready",
      $scope.startread = function(){
        Gyro.getData;
        console.log($rootScope.test);
      }
    );

});

gyroModule.factory('Gyro', function($rootScope,$cordovaDeviceOrientation){
    return {
            getData : function(){
               $cordovaDeviceOrientation.getCurrentHeading().then(
                    function(result){
                        $rootScope.test = result.magneticHeading;
                    },
                    function(error){
                         $rootScope.test = "wala uyy";
                    }
                )
              // console.log("navigator.accelerometer");
       
                // $rootScope.pft = ":P"

              }
            
    }
});