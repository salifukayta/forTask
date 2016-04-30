/**
 * Created by Salifukayta on 18/04/2016.
 */

'use strict'

ftApp.controller('HistoryController', ['$scope', 'taskService', function ($scope, taskService) {

  this.tasks = [];
  this.loading = false;
  this.noInternetConnection = false;
  var _this = this;

  this.getIconStatus = function (task) {
    var taskIcon = "";
    switch (task.status) {
      case "Todo":
        taskIcon = "ion-ios-bolt";
        break;
      case "Complete":
        taskIcon = "ion-checkmark-round"
        break;
      case "Remove":
        taskIcon = "ion-close-round";
        break;
      case "CarryOver":
        taskIcon = "ion-ios-redo";
        break;
      default:
        console.log("icon for status", task.status, " not provided");
    }
    return taskIcon;
  };

  this.testConnection = function () {
    _this.loading = true;
    taskService.testConnection()
      .then(function (data) {
        _this.noInternetConnection = false;
        _this.loading = false;
      })
      .catch(function (err) {
        _this.noInternetConnection = true;
        _this.loading = false;
      });
  };

  $scope.$on('$ionicView.enter', function (e) {
    _this.loading = true;
    taskService.getAll()
      .then(function (tasks) {
        _this.loading = false;
        _this.tasks = tasks;
        console.log('$ionicView.enter HistoryController: ', _this.tasks);
      })
      .catch(function (err) {
        _this.loading = false;
      });
  });
  
}]);
