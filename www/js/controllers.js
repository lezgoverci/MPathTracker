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

        $scope.stop = function($scope){
         Gyro.stopGyro();
        }

});



gyroModule.factory('Gyro',function($cordovaDeviceOrientation,cordovaReady,$ionicPlatform){


 var arr = [];
 var obj = new Object();
 var id = null;
 var watchID = null;



return{
    getGyroData: cordovaReady(function($scope){

    

        // Update compass every 3 seconds
        var options = { frequency: 1000 };

        watchID = navigator.compass.watchHeading(onSuccess, onError, options);
    

    // Stop watching the compass
    //
    function stopWatch() {
        if (watchID) {
            navigator.compass.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get the current heading
    //
    function onSuccess(heading) {
        obj.magneticHeading = heading.magneticHeading;
        obj.timeStamp = heading.timeStamp;
        arr.push(JSON.stringify(obj));
        $scope.testvalue = arr;
    }

    // onError: Failed to get the heading
    //
    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    }

    // function onSuccess(heading) {
    //     obj.magneticHeading = heading.magneticHeading;
    //     obj.timeStamp = heading.timeStamp;
    //     arr.push(JSON.stringify(obj));
    //     $scope.testvalue = arr;
    // };

    // function onError(compassError) {
    //     alert('Compass error: ' + compassError.code);
    // };

    // var options = {
    //     frequency: 1000
    // }; // Update every 3 seconds

    // var watchID = navigator.compass.watchHeading(onSuccess, onError, options);

      }
      ),

    stopGyro: cordovaReady(function(){
      if (watchID) {
            navigator.compass.clearWatch(watchID);
            watchID = null;
        }
        else{
          window.alert("haaaaa");
        }
      

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


