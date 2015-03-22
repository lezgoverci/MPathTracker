angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById('appBody'),['trackerApp']);
});

var gyroModule = angular.module('GyroModule',['ngCordova'])
.controller('CompassReadingsController',function ($scope, Compass, $cordovaFile ) {

        $scope.push = function(){
            Compass.getCompassData($scope);
        }

        $scope.view = function(){
                  
        }

        $scope.stop = function(){
         Compass.stopCompass();
        }


});

gyroModule.factory('Compass',function($cordovaDeviceOrientation,cordovaReady,$cordovaFile){



 var watchID = null;
 var count = 0;
 var limit =  10;
 var arrBeta = [];

 var arrHeading = [];
 var beta = null;

 var heading = null;


return{
    getCompassData: cordovaReady(function($scope){

        // Update compass every 3 seconds
        var options = { frequency: 100 };
        
        window.addEventListener('deviceorientation', function(event) {

          beta = Math.floor(event.beta);
        });
        watchID = navigator.compass.watchHeading(onSuccess, onError, options);

    // onSuccess: Get the current heading
    function onSuccess(heading) {
      if(count <= limit){
        heading = Math.floor(heading.magneticHeading);
        arrHeading.push(heading);
        arrBeta.push(beta);


        beta = null;
        heading = null;

        count = count + 1;
        
      }
      else{


        var jsonBeta= JSON.parse(window.localStorage['jsonBeta'] || '[]');
        var jsonHeading = JSON.parse(window.localStorage['jsonHeading'] || '[]');


        var concatBeta = jsonBeta.concat(arrBeta);
        var concatHeading = jsonHeading.concat(arrHeading);
       

        window.localStorage['jsonBeta'] = JSON.stringify(concatBeta);
        window.localStorage['jsonHeading'] = JSON.stringify(concatHeading);

        count = 0;

        arrBeta = [];
        arrHeading = [];
      }

        
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
            // window.alert("stopped");
        }
        else{
          // window.alert("haaaaa");
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

    GyroReader.view();
    $scope.finalData = JSON.parse(window.localStorage['finalData']);

    // $scope.writeFiles = function(){
    //   GyroReader.test();
    // }    

});

gyroModule.factory("GyroReader",function($cordovaFile){

  return{
    test: function($scope){
      $cordovaFile.writeFile("beta.txt",window.localStorage['jsonBeta'],false);

      $cordovaFile.writeFile("heading.txt",window.localStorage['jsonHeading'],false);
    },

    view: function(){


      var beta = JSON.parse(window.localStorage['jsonBeta']);
      var heading = JSON.parse(window.localStorage['jsonHeading']);


      var slicedBeta = beta.slice(50,beta.length-50);
      var slicedHeading = heading.slice(50,heading.length-50);


      var aveBeta = filter(5,slicedBeta);
      var meanBeta = mean(aveBeta);


      var stepCountBeta = countSteps(aveBeta,meanBeta);
      var finalData = findPath(slicedHeading);
      window.localStorage['finalData'] = JSON.stringify(finalData);
      // alert("steps beta : " + stepCountBeta);
      // alert(JSON.parse(window.localStorage['allMax']).length);
      // alert(JSON.parse(window.localStorage['allMax']));
      // alert(JSON.parse(window.localStorage['finalData']));


      function findPath(heading){
        var result = [];
        var maxIndexes = JSON.parse(window.localStorage['allMax']);
        for(i=0; i< maxIndexes.length;i++){
          result.push(heading[maxIndexes[i]]);
        }
        return result;

      }



      function mean(arr){
        var sum = 0;
        for(i=0;i<arr.length;i++){
          sum = sum + arr[i];
        }

        return sum/arr.length;
      }


      function countSteps(arr,mean){
        var count = 0;
        var found = false;
        var maxInd = [];
        var temp = [];
        for(i = 0; i < arr.length; i++){
          if((arr[i] >= mean) || (arr[i-1] >= mean) || (arr[i+1] >= mean)){
            if(found == false){
               count = count + 1;
            }
            found = true;
            temp.push(i);
          }
          else{
            if(found == true){
                
                maxInd.push(temp[Math.floor(temp.length/2)]);
                temp = [];
               found = false;
            }
          }
        }

        window.localStorage['allMax'] = JSON.stringify(maxInd);
        return count;
      }


      function filter(range,arr){

        var result = [];
        for(i=0; i<arr.length; i++){

          result.push(Math.floor(findAve(arr,i,range)));
        }
        //window.localStorage['aveBeta'+range.toString()] = JSON.stringify(result);
        return result;
      }

      function findAve(arr,i,range){
       
        var sum = 0;
        var a = arr.slice(i,i+range);

        for(i=0;i<a.length;i++){
          sum = sum + a[i];
        }
        return sum/a.length;
      }


    }
    
  }
});

gyroModule.controller("ViewGyroController",function($scope){
  $scope.finalData = JSON.parse(window.localStorage['finalData']);
  alert($scope.finalData );

  

});