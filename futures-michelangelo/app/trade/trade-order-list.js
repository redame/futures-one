'use strict';

angular.module('miche.trade.order.list', ['ngRoute', 'miche.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/trade/orders', {
    templateUrl: 'trade/trade-order-list.html',
    controller: 'micheTradeOrderListCtrl'
  });
}])

.controller('micheTradeOrderListCtrl', ['$scope', '$filter', '$modal', 'micheHttp', 'micheChart', 'micheData',
  function($scope, $filter, $modal, micheHttp, micheChart, micheData) {

    var refresh = function() {
      micheHttp.get('/trade/list-trade-order').success(function(orderList) {
        $scope.orderList = orderList;
        $scope.totalAmount = 0;
        $scope.totalFee = 0;
        $scope.totalProfit = 0;
        orderList.forEach(function(order) {
          $scope.totalAmount += order.amount | 0;
          $scope.totalFee += order.fee | 0;
          $scope.totalProfit += order.profit | 0;
        });

        $('#trade-order-table').dataTable({
          "data": orderList,
          "destroy": true,
          "info": false,
          "order": [
            [1, "desc"]
          ],
          "columns": [{
            "data": "conCode"
          }, {
            "data": "tradeDt"
          }, {
            "data": "type"
          }, {
            "data": "price"
          }, {
            "data": "vol"
          }, {
            "data": "amount"
          }, {
            "data": "fee"
          }, {
            "data": "profit"
          }, {
            "data": "comment"
          }, {
            "data": "groupId"
          }, {
            "data": "id"
          }],
          "columnDefs": [{
            "render": function(data, type, row) {
              return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
            },
            "targets": [1]
          }, {
            "render": function(data, type, row) {
              if (data == 1) {
                return '买开'
              } else if (data == 2) {
                return '卖开'
              } else if (data == 3) {
                return '卖平'
              } else if (data == 4) {
                return '买平'
              } else {
                return ''
              }
            },
            "targets": [2]
          }, {
            "render": function(data, type, row) {
              if(data) {
                return data.toLocaleString();
              } else {
                return null;
              }
            },
            "targets": [3,4,5,6,7]
          }, {
            "render": function(data, type, row) {
              if(data) {
                return row.groupName + ' (' + row.groupId + ')';
              } else {
                return null;
              }
            },
            "targets": [9]
          }]
        });
      });
    };

    $scope.addTradeModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'addTradeModal.html',
        controller: 'micheAddTradeModalCtrl'
      });
      modalInstance.result.then(function() {
        refresh();
      });
    };
    $scope.openPositionModal = function() {
      var openId = $('#openId').val();
      var openTrade;
      $scope.tradeList.some(function(trade) {
        if (trade.id == openId) {
          openTrade = trade;
          return true;
        }
      });
      var modalInstance = $modal.open({
        templateUrl: 'openPositionModal.html',
        controller: 'micheOpenPositionModalCtrl',
        resolve: {
          params: function() {
            return {
              trade: openTrade
            };
          }
        }
      });
      modalInstance.result.then(function() {
        refresh();
      });
    };
    $scope.detailTradeModal = function() {
      var detailId = $('#detailId').val();
      var detailTrade;
      $scope.tradeList.some(function(trade) {
        if (trade.id == detailId) {
          detailTrade = trade;
          return true;
        }
      });
      var modalInstance = $modal.open({
        size: 'lg',
        templateUrl: 'detailTradeModal.html',
        controller: 'micheDetailTradeModalCtrl',
        resolve: {
          params: function() {
            return {
              trade: detailTrade
            };
          }
        }
      });
      modalInstance.result.then(function() {
        refresh();
      });
    };

    refresh();

  }
])

.controller('micheAddTradeModalCtrl',
  function($scope, micheHttp, micheData, $modalInstance) {
    $scope.tradeTypes = [{
      code: '1',
      name: '开多'
    }, {
      code: '2',
      name: '开空'
    }, {
      code: '3',
      name: '对冲'
    }];
    $scope.trade = {
      name: '',
      type: '3'
    };

    $scope.ok = function() {
      micheHttp.post('/trade/add-trade', $scope.trade)
        .success(function(trade) {
          if (trade) {
            $modalInstance.close(trade);
          } else {
            alert('Error!');
          }
        });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }
)

.controller('micheDetailTradeModalCtrl',
  function($scope, micheHttp, micheData, $modalInstance, params) {
    $scope.trade = params.trade;
    micheHttp.get('/trade/detail-trade', {
      id: params.trade.id
    }).success(function(detail) {
      $('#balance-table').dataTable({
        "data": detail.balanceList,
        "destroy": true,
        "paging": false,
        "searching": false,
        "info": false,
        "columns": [{
          "data": "conCode"
        }, {
          "data": "type"
        }, {
          "data": "vol"
        }, {
          "data": "avgCostPrice"
        }, {
          "data": "price"
        }, {
          "data": "margin"
        }, {
          "data": "floatProfit"
        }, {
          "data": "completeProfit"
        }, {
          "data": "profit"
        }],
        "columnDefs": [{
          "render": function(data, type, row) {
            if (data == 1) {
              return '多'
            } else if (data == 2) {
              return '空'
            }
          },
          "targets": [1]
        }, {
          "render": function(data, type, row) {
            if (data) {
              return data.toLocaleString();
            } else {
              return '';
            }
          },
          "targets": [3, 4, 5]
        }, {
          "render": function(data, type, row) {
            if (data > 0) {
              return '<span style="color:red">' + data.toLocaleString() + '</span>';
            } else if (data < 0) {
              return '<span style="color:green">' + data.toLocaleString() + '</span>';
            } else {
              return data;
            }
          },
          "targets": [6, 7, 8]
        }]
      });

      $('#action-table').dataTable({
        "data": detail.actionList,
        "destroy": true,
        "paging": false,
        "searching": false,
        "info": false,
        "columns": [{
          "data": "id"
        }, {
          "data": "dt"
        }, {
          "data": "conCode"
        }, {
          "data": "type"
        }, {
          "data": "vol"
        }, {
          "data": "price"
        }],
        "columnDefs": [{
          "render": function(data, type, row) {
           if (data) {
                var date = new Date(data);
                var year = date.getFullYear();
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                return year + "-" + month + "-" + day;
              } else {
                return '';
              }
          },
          "targets": [1]
        }, {
          "render": function(data, type, row) {
            if (data) {
              return data.toLocaleString();
            } else {
              return '';
            }
          },
          "targets": [5]
        }, {
         "render": function(data, type, row) {
            if (data == 1) {
              return '多'
            } else if (data == 2) {
              return '空'
            }
          },
          "targets": [3]
        }]
      });
    });
  }
)

.controller('micheOpenPositionModalCtrl',
  function($scope, micheHttp, micheData, $modalInstance, params) {
    $scope.actionTypes = [{
      code: '1',
      name: '开多'
    }, {
      code: '2',
      name: '开空'
    }];
    $scope.trade = params.trade;
    $scope.action = {
      tradeId: params.trade.id,
      conCode: '',
      dt: new Date(),
      type: '1',
      price: '',
      vol: ''
    };

    $scope.ok = function() {
      micheHttp.post('/trade/add-action', $scope.action)
        .success(function(action) {
          if (action) {
            $modalInstance.close(action);
          } else {
            alert('Error!');
          }
        });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }
);
