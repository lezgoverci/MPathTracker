angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById('appBody'),['trackerApp']);
});

var gyroModule = angular.module('GyroControllers',['ngCordova'])
.controller('GyroReadingsController',function ($scope, Gyro ) {

        $scope.push = function(){
           Gyro.getGyroData($scope);
        }

        $scope.view = function(){
          window.alert($scope.testvalue);          
        }

});



gyroModule.factory('Gyro',function($cordovaDeviceOrientation,cordovaReady){


 var arr = [];
 var obj = new Object();

return{
    getGyroData: cordovaReady(function($scope){
    var options = {
      frequency: 100
    }

    $cordovaDeviceOrientation.watchHeading(options).then(
      null,
      function(error) {
        // An error occurred
      },
      function(result) {   
            obj.magneticHeading = result.magneticHeading;
            obj.timestamp = result.timestamp;
            arr.push(JSON.stringify(obj));
            $scope.testvalue = arr;

      });

      })
  }
});
      
    

  





gyroModule.factory('cordovaReady', function() {
  return function (fn) {

    var queue = [];

    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);

    return function () {
      return impl.apply(this, arguments);
    };
  };
});


