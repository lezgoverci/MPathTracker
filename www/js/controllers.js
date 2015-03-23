angular.element(document).ready(function(){
  angular.bootstrap(document.getElementById('appBody'),['trackerApp']);
});

var gyroModule = angular.module('GyroModule',['ngCordova'])
.controller('CompassReadingsController',function ($scope, Compass, $cordovaFile ) {

        $scope.push = function(){
            Compass.getCompassData($scope);
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


gyroModule.controller("AnalyzerController",function($cordovaFile,$scope,GyroReader,HeadingConverter, CompassGuide){

    GyroReader.view();
    var data = JSON.parse(window.localStorage['allMax']);

    HeadingConverter.convert(data);
    var converted = JSON.parse(window.localStorage['converted']);
    // HeadingConverter.invert(converted);
    // var inverted = JSON.parse(window.localStorage['inverted']);

    $scope.finalData = findDirection(converted).reverse();

      CompassGuide.view($scope);
    

    function findDirection(arr){
      
      var range = 11.25;
      var prev = arr[0].d;
      var tempPrev = null;
      for(i = 0; i < arr.length; i++){
        tempPrev = arr[i].d;
        // if((prev - range * 2) < 0){
        //   prev = prev + 180; 
        // }
        // else if((prev + range * 2) > 360){
        //   prev = prev - 360;
        // }
        // if(arr[i].d < 0){
        //   arr[i].d = arr[i].d + 360;
        // }

        if((arr[i].d >= prev - (range * 1)) && (arr[i].d < prev + (range * 1))){
          arr[i].d = "N";
        }
        else if((arr[i].d >= prev + (range * 1)) && (arr[i].d < prev + (range * 3))){
          arr[i].d = "NE";
        }
        else if((arr[i].d >= prev + (range * 3)) && (arr[i].d < prev + (range * 5))){
          arr[i].d = "E";
        }
        else if((arr[i].d >= prev - (range * 3)) && (arr[i].d < prev - (range * 1))){
          arr[i].d = "NW";
        }
        else if((arr[i].d >= prev - (range * 5)) && (arr[i].d < prev - (range * 3))){
          arr[i].d = "W";
        }
        else if((arr[i].d >= prev - (range * 7)) && (arr[i].d < prev - (range * 5))){
          arr[i].d = "SW";
        }
        else if((arr[i].d >= prev + (range * 5)) && (arr[i].d < prev + (range * 7))){
          arr[i].d = "SE";
        }
        else{
          arr[i].d = "S";
        }

        prev = tempPrev;


          
        
      }

      return arr;
    }
    



     




    // $scope.writeFiles = function(){
    //   GyroReader.test();
    // }    

});

gyroModule.factory("CompassGuide",function(cordovaReady,$cordovaDeviceOrientation){

  var watchID = null;
  return{
    view: cordovaReady(function($scope){

       
        watchID = navigator.compass.watchHeading(onSuccess, onError);
       
      

      function onSuccess(heading){
        $scope.mycompass = heading.magneticHeading;
      }

      function onError(compassError) {
        alert('Compass error: ' + compassError.code);
      }
    })
  }
});

gyroModule.factory("HeadingConverter",function(){

  return{
    convert: function(arr){
      var test = mergeHeadings(arr);
      var test2 = analyzeMergeHeadings(test); 
      window.localStorage['converted'] = JSON.stringify(test2);



     



      function analyzeMergeHeadings(arr){
        var array = arr;
        var result = [];
        var size = 0;
        var ave = 0;

        console.log(JSON.stringify(array));

        for(i=0;i<array.length;i++){

          var obj = new Object();
          // obj.s = array[i].length;
          // obj.d = array[i];
          result.push({s:array[i].length,d:Math.floor(aveHeading(array[i]))});
          
         

        }


        return result;
      }

      function mergeHeadings(arr){

        var result = [];
        var current = arr[0];
        var tempHeading = [];
        var factor = 20;

        for(i=0;i<arr.length;i++){
          if((arr[i] >= current - factor)&&(arr[i] <= current + factor)){
            tempHeading.push(arr[i]);
            
          }
          else{
            current = arr[i];  
            result.push(tempHeading);            
            tempHeading = [];
                   
            tempHeading.push(current);
          }

          if(i == (arr.length -1)){
              result.push(tempHeading);
            }
        }
        
        return result;
      }

      function aveHeading(arr){
      
         var sum = 0;

         for(var i = 0 ; i  < arr.length ;i++){
           sum += arr[i];
           

        }

        return sum/arr.length;
      }
      
      
      // function convertHeadings(arr,factor){
      //   var temp = [];
      //   for(i=0;i<arr.length;i++){
      //     if((arr[i] >= 338 + factor) && (arr[i] < 23 + factor)){
      //       temp.push({h:arr[i],d:"North"});
      //     }
      //     else if((arr[i] >= 23 + factor) && (arr[i] < 68 + factor)){
      //       temp.push({h:arr[i],d:"North East"});
      //     }
      //     else if((arr[i] >= 68 + factor) && (arr[i] < 113 + factor)){
      //       temp.push({h:arr[i],d:"East"});
      //     }
      //     else if((arr[i] >= 113 + factor) && (arr[i] < 158 + factor)){
      //       temp.push({h:arr[i],d:"South East"});
      //     }
      //     else if((arr[i] >= 158 + factor) && (arr[i] < 203 + factor)){
      //       temp.push({h:arr[i],d:"South"});
      //     }
      //     else if((arr[i] >= 203 + factor) && (arr[i] < 248 + factor)){
      //       temp.push({h:arr[i],d:"South West"});
      //     }
      //     else if((arr[i] >= 248 + factor) && (arr[i] < 293 + factor)){
      //       temp.push({h:arr[i],d:"West"});
      //     }
      //     else{
      //       temp.push({h:arr[i],d:"North West"});
      //     }
      //     // if((arr[i] >= 315) && (arr[i] < 45)){
      //     //   temp.push({h:arr[i],d:"North"});
      //     // }
      //     // else if((arr[i] >= 45) && (arr[i] < 135)){
      //     //   temp.push({h:arr[i],d:"East"});
      //     // }
      //     // else if((arr[i] >= 135) && (arr[i] < 225)){
      //     //   temp.push({h:arr[i],d:"South"});
      //     // }
      //     // else {
      //     //   temp.push({h:arr[i],d:"West"});
      //     // }

      //   }

      //   return JSON.stringify(temp);
      // }
    },
    invert: function(arr){



      for(var i = 0;i<arr.length;i++){
        var res = arr[i].d - 180;
        
        if(res < 0){
          arr[i].d = arr[i].d + 180;
        }
        else{
          arr[i].d = res;
        }
       
      }

      window.localStorage['inverted'] = JSON.stringify(arr.reverse());
      // alert(JSON.stringify(arr));


    }
  }

});

gyroModule.factory("GyroReader",function($cordovaFile){

  return{
    test: function($scope){
      $cordovaFile.writeFile("beta.txt",window.localStorage['jsonBeta'],false);

      $cordovaFile.writeFile("heading.txt",window.localStorage['jsonHeading'],false);
    },

    view: function(){


      var beta = JSON.parse(window.localStorage['jsonBeta'] || '[]');
      var heading = JSON.parse(window.localStorage['jsonHeading'] || '[]');


      var slicedBeta = beta.slice(50,beta.length-50);
      var slicedHeading = heading.slice(50,heading.length-50);


      var aveBeta = filter(5,slicedBeta);
      var aveHeading = filterGyro(slicedHeading,2);
      var meanBeta = mean(aveBeta);


      var stepCountBeta = countSteps(aveBeta,meanBeta,aveHeading);
      // alert(stepCountBeta);
      var allMax = JSON.parse(window.localStorage['allMax']);
      // alert(allMax.length);


      window.localStorage['finalData'] = window.localStorage['allMax'];
      // alert("steps beta : " + stepCountBeta);
      // alert(JSON.parse(window.localStorage['allMax']).length);
      // alert(JSON.parse(window.localStorage['allMax']));
      // alert(JSON.parse(window.localStorage['finalData']));


      function filterGyro(arr,factor){
        for(i=factor;i<arr.length-factor;i++){
          if((arr[i] < arr[i-factor]) && (arr[i] < arr[i+factor])){
            arr[i] = arr[i-factor];
          }
        }

        return arr;
      }


      // function findPath(heading){
      //   var result = [];
      //   var maxIndexes = JSON.parse(window.localStorage['allMax']);
      //   for(i=0; i< maxIndexes.length;i++){
      //     result.push(heading[maxIndexes[i]]);
      //   }
      //   return result;

      // }



      function mean(arr){
        var sum = 0;
        for(i=0;i<arr.length;i++){
          sum = sum + arr[i];
        }

        return sum/arr.length;
      }


      function countSteps(arr,mean,heading){
        var count = 0;
        var found = false;
        var max = [];
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
                
                max.push(heading[temp[Math.floor(temp.length/2)]]);
                temp = [];
               found = false;
            }
          }
        }

        window.localStorage['allMax'] = JSON.stringify(max);
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

// gyroModule.controller("ViewGyroController",function($scope){
  
//   alert($scope.finalData );

  

// });