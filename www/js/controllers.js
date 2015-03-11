angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById('appBody'),['trackerApp']);
});

var gyroModule = angular.module('GyroModule',['ngCordova'])
.controller('CompassReadingsController',function ($scope, Compass ) {

        $scope.push = function(){
            Compass.getCompassData($scope);
        }

        $scope.view = function(){
          window.alert($scope.testvalue);          
        }

        $scope.stop = function($scope){
         Compass.stopCompass();
        }

});

gyroModule.factory('Compass',function($cordovaDeviceOrientation,cordovaReady,$ionicPlatform){


 var arr = [];
 var obj = new Object();
 var id = null;
 var watchID = null;



return{
    getCompassData: cordovaReady(function($scope){

    

        // Update compass every 3 seconds
        var options = { frequency: 1000 };

        
        window.addEventListener('deviceorientation', function(event) {
          obj.gyroAlpha = event.alpha;
          obj.gyroBeta = event.beta;
          obj.gyroGamma = event.gamma;
        });
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
        obj.timestamp = heading.timestamp;
        arr.push(JSON.stringify(obj));
        $scope.testvalue = arr;
    }

    // onError: Failed to get the heading
    //
    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    }

      }),

    stopCompass: cordovaReady(function(){
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


