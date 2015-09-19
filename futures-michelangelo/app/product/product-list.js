'use strict';

angular.module('miche.product.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products', {
    templateUrl: 'product/product-list.html',
    controller: 'micheProductListCtrl'
  });
}])

.controller('micheProductListCtrl', [function() {

  $.getJSON('http://139.196.37.92:8000/futures-api/web/futures/all', function(data) {
    $('#example').dataTable({
      "data": data,
      "paging": false,
      "searching": false,
      "info": false,
      "columns": [{
        "data": "product.code"
      }, {
        "data": "product.name"
      }, {
        "data": "price"
      }, {
        "data": "last1RIncPct"
      }, {
        "data": "last5RIncPct"
      }, {
        "data": "last10RIncPct"
      }, {
        "data": "last30RIncPct"
      }, {
        "data": "last60RIncPct"
      }, {
        "data": "last1KIncPct"
      }, {
        "data": "last5KIncPct"
      }, {
        "data": "last10KIncPct"
      }, {
        "data": "last30KIncPct"
      }, {
        "data": "last60KIncPct"
      }],
      "columnDefs": [{
        "render": function(data, type, row) {
          return '<a href="#/product/' + row.product.code + '">' + data + '</a>';
        },
        "targets": [0,1]
      }, {
        "render": function(data, type, row) {
          return data.toLocaleString();
        },
        "targets": [2]
      }, {
        "render": function(data, type, row) {
          var out = (data * 100).toFixed(2);
          if (out > 0) {
            return '<span style="color:red">' + out + '</span>';
          } else if (out < 0) {
            return '<span style="color:green">' + out + '</span>';
          } else {
            return out;
          }
          return out;
        },
        "targets": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }]
    });
  });

}]);