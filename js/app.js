var minesweeper = angular.module('minesweeper',[]);
minesweeper.controller('TodoCtrl', ['$scope', '$http','$location',
function($scope,$http,$routeParams, $timeout,$location,$window){
  $scope.lastScore=0;
  $scope.init=function(){
    $scope.name="MineSweeper";
      $scope.mines=new Array();
      $scope.bombs=new Array();
      $scope.dbombs=new Array();
      $scope.m=false;
      $scope.correctMatch=0;
      $scope.bombinfo="";
  }
  $scope.generateGame=function(){
    $scope.mines=new Array();
    $scope.bombs=new Array();
    $scope.dbombs=new Array();
    $scope.bombinfo="";
    $scope.correctMatch=0;
    $scope.minesAt();
    for (var i = 0; i < $scope.value; i++) {
      $scope.mines.push(i);
    };
    $(".game-over").html("");
  };
  $scope.mineCheck=function(a,b){
    $scope.bombCalculation($scope.value*a+b);
  };
  $scope.pushbomb=function(){
    var b=Math.floor((Math.random()*Math.pow($scope.value,2)));
    angular.forEach($scope.bombs, function(bom){
           if(b==bom){
         b=$scope.pushbomb(); 
       }
    });
    return b;
  };
  $scope.minesAt=function(){
    $scope.bombs=new Array();
    for (var i = 0; i < Math.pow($scope.value,2)/6; i++) {
      $scope.bombs.push($scope.pushbomb());
    };
  };
  $scope.bombCalculation=function(a){
    if((Number($scope.correctMatch)+1)>=Math.floor(Number((Math.pow($scope.value,2)*5)/6))){
      alert("You Won The Game");
      $scope.lastScore=$scope.correctMatch;
      $(".game-over").html("<img src='img/you_won.gif' />");
      $scope.init();
    }
    angular.forEach($scope.bombs, function(b){
      if(b == a){
        $scope.mines=new Array();
        $scope.dbombs=$scope.bombs;
        $scope.bombinfo="Bombs were at";
        alert("You Lost");
        $scope.lastScore=$scope.correctMatch;
        // $scope.correctMatch-=1;
        $(".game-over").html("<img src='img/game_over.gif' />");
      }
      else{
        var ele="#"+a;
        $(ele).css("background","green");
      }
      console.log(Number($scope.correctMatch),(Math.pow($scope.value,2)*5)/6);
    });
    $scope.correctMatch+=1;
    var neigh=new Array();
    var score=0;
    neigh.push(a+$scope.value);
    if((a% $scope.value)!=($scope.value-1)) neigh.push(a+1);
    if((a% $scope.value)!=0) neigh.push(a-1);
    if((a-$scope.value)>=0) neigh.push(a-$scope.value);
    if(Math.floor((a-$scope.value-1)/$scope.value)==Math.floor((a-$scope.value)/$scope.value)) neigh.push(a-$scope.value-1);
    if(Math.floor((a-$scope.value+1)/$scope.value)==Math.floor((a-$scope.value)/$scope.value)) neigh.push(a-$scope.value+1);
    if(Math.floor((a+$scope.value-1)/$scope.value)==Math.floor((a+$scope.value)/$scope.value)) neigh.push(a+$scope.value-1);
    if(Math.floor((a+$scope.value+1)/$scope.value)==Math.floor((a+$scope.value)/$scope.value)) neigh.push(a+$scope.value+1);
    angular.forEach(neigh,function(n){
      angular.forEach($scope.bombs,function(bom){
          if(n==bom){
            score+=1;
          }
        });
    });
    var ele="#"+a;
    $(ele).text(score);
    $(ele).addClass("correct");
  };
}]);