/**
 * Created by Salifukayta on 16/04/2016.
 */

'use strict';

ftApp.controller('TaskController', ['$scope', '$stateParams', '$cordovaToast', '$localstorage', 'taskService',
  function ($scope, $stateParams, $cordovaToast, $localstorage, taskService) {

    this.tasks = [];
    this.newTask = {name: '', status: 'Todo', date: new Date(), user: 'Chris'};
    this.selectedTask = null;
    this.isAddMode = false;
    this.loading = false;
    this.noInternetConnection = false;
    var _this = this;

    this.testConnection = function () {
      _this.loading = true;
      taskService.testConnection()
        .then(function (data) {
          _this.loading = false;
          _this.noInternetConnection = false;
        })
        .catch(function (err) {
          _this.loading = false;
          _this.noInternetConnection = true;
        });
    };

    $scope.$on('$ionicView.enter', function (e) {
      //FIXME based on time change this boolean, morning = true, evening, false => do this ?
      _this.isAddMode = $stateParams.isAddMode == "true";
      if ($localstorage.get("user") != null) {
        _this.newTask.user = $localstorage.get("user");
      }
      _this.selectedTask = null;

      _this.loading = true;
      taskService.getTodoForToday()
        .then(function (tasks) {
          _this.noInternetConnection = false;
          _this.loading = false;
          _this.tasks = tasks;
          console.log('$ionicView.enter: ', _this.tasks);
        })
        .catch(function (err) {
          _this.noInternetConnection = true;
          _this.loading = false;
          console.log(err);
          showToast(err);
        });
    });

    this.addTask = function () {
      if (this.tasks.indexOf(this.newTask) === -1) {
        taskService.add(this.newTask)
          .then(function (data) {
            _this.noInternetConnection = false;
            console.log("taskService.add(", _this.newTask, ") done");
            showToast(data);
            _this.tasks.push({name: _this.newTask.name, status: _this.newTask.status, date: _this.newTask.date, user: _this.newTask.user});
            _this.newTask.name = '';
          })
          .catch(function (err) {
            _this.noInternetConnection = true;
            console.log(err);
            showToast(err);
          });
      }
    };

    this.selectTask = function (selectedTask) {
      this.selectedTask = selectedTask;
    };

    //TODO add class to selected item
    //Not working
    // this.isSelected = function(task) {
    //   if (task.id === _this.selectedTask.id) {
    //     return 'activated';
    //   }
    //   return false;
    // };

    this.checkTask = function () {
      this.selectedTask.status = "Complete";
      editAndPopTask();
    };

    this.carryOverTask = function () {
      this.selectedTask.status = "CarryOver";
      editAndPopTask();
    };

    this.removeTask = function () {
      this.selectedTask.status = "Remove";
      editAndPopTask();
    };

    var editAndPopTask = function () {
      taskService.edit(_this.selectedTask)
        .then(function (data) {
          _this.noInternetConnection = false;
          console.log("taskService.edit(", _this.selectedTask, ") done");
          _this.tasks.splice(_this.tasks.indexOf(_this.selectedTask), 1);
          _this.selectedTask = null;
        })
        .catch(function (err) {
          _this.noInternetConnection = true;
          console.log(err);
          showToast(err);
        });
    };

    var showToast = function (data) {
      if (data) {
        $cordovaToast.showLongBottom(data)
          .then(function (success) {
            console.log(success);
          }, function (error) {
            console.log(error);
          });
      }
    };

  }]
);
