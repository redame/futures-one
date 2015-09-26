'use strict';

angular.module('miche.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'micheHomeCtrl'
  });
}])

.controller('micheHomeCtrl', ['$scope', '$http', 'CF',
  function($scope, $http, CF) {

    $http.get(CF.preurl + '/comments').success(function(comments) {
      $scope.comments = comments;
    });

    $scope.hasComments = function() {
      return $scope.comments && $scope.comments.length > 0;
    }

    $.getJSON('http://139.196.37.92:8000/futures-api/hedging/realtime/1', function(data) {
      $('#container1').highcharts({
        chart: {
          zoomType: 'x'
        },
        title: {
          text: data[0].name + '实时'
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: '钻石点'
          }
        },
        tooltip: {
          shared: true,
          crosshairs: true
        },
        series: data
      });
    });

    $.getJSON('http://139.196.37.92:8000/futures-api/hedging/realtime/2', function(data) {
      $('#container2').highcharts({
        chart: {
          zoomType: 'x'
        },
        title: {
          text: data[0].name + '实时'
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: '钻石点'
          }
        },
        tooltip: {
          shared: true,
          crosshairs: true
        },
        series: data
      });
    });

    $.getJSON('http://139.196.37.92:8000/futures-api/hedging/daily/1', function(data) {
      $('#container3').highcharts({
        chart: {
          zoomType: 'x'
        },
        title: {
          text: data[0].name + '日线'
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: '钻石点'
          }
        },
        tooltip: {
          shared: true,
          crosshairs: true
        },
        series: data
      });
    });

    $.getJSON('http://139.196.37.92:8000/futures-api/hedging/daily/2', function(data) {
      $('#container4').highcharts({
        chart: {
          zoomType: 'x'
        },
        title: {
          text: data[0].name + '日线'
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          title: {
            text: '钻石点'
          }
        },
        tooltip: {
          shared: true,
          crosshairs: true
        },
        series: data
      });
    });

  }
]);