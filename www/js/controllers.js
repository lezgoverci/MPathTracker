angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById('appBody'),['trackerApp']);
});

var gyroModule = angular.module('GyroModule',['ngCordova'])
.controller('CompassReadingsController',function ($scope, Compass, $cordovaFile ) {

        $scope.push = function(){
            Compass.getCompassData($scope);
        }

        $scope.view = function(){
          // window.alert($scope.testvalue);          
        }

        $scope.stop = function(){
         Compass.stopCompass();
         // $cordovaFile.writeFile("gyroData.txt",JSON.stringify($scope.arr),false)
         //  .then(function(success){
         //    window.alert("done uy");
         //  },function(error){
         //    window.alert("wala uy");
         //  });
        }


});

gyroModule.factory('Compass',function($cordovaDeviceOrientation,cordovaReady,$cordovaFile){


 var arr = [];
 var obj = new Object();
 var id = null;
 var watchID = null;
 var count = 0;
 var limit =  5;


return{
    getCompassData: function($scope){

    

        // Update compass every 3 seconds
        var options = { frequency: 1000 };

        
        window.addEventListener('deviceorientation', function(event) {
          obj.gyroAlpha = event.alpha;
          obj.gyroBeta = event.beta;
          obj.gyroGamma = event.gamma;
        });
        watchID = navigator.compass.watchHeading(onSuccess, onError, options);
    

    // onSuccess: Get the current heading
    //
    function onSuccess(heading) {
      if(count <= limit){
        obj.magneticHeading = heading.magneticHeading;
        obj.timestamp = heading.timestamp;
        arr.push(JSON.stringify(obj));
        count = count + 1;
      }
      else{
        $cordovaFile.writeFile("gyroData.txt",JSON.stringify(arr),false)
          .then(function(success){
            window.alert("done uy");
          },function(error){
            window.alert("wala uy");
          });

        count = 0;
        $scope.arr = [];
      }
        
    }

    // onError: Failed to get the heading
    //
    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    }

      },

    stopCompass: cordovaReady(function(){
      if (watchID) {
            navigator.compass.clearWatch(watchID);
            watchID = null;
            window.alert("stopped na jd");
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


gyroModule.controller("AnalyzerController",function($cordovaFile,$scope,GyroReader){
  $scope.view = function(){
    GyroReader.view();
  }
});

gyroModule.factory("GyroReader",function(cordovaReady,$cordovaFile){
  return{
    view: cordovaReady(function(){
      $cordovaFile.readAsText("gyroData.txt")
      .then(function(success){
        window.alert(success);
      },function(error){});
    })
    
  }
});