/**
 * Created by Salifukayta on 17/04/2016.
 */

'use strict';

ftApp.factory('taskService', ['$q', '$http', 'BASE_BACK_END_URL', function ($q, $http, BASE_BACK_END_URL) {

  return {
    testConnection: function () {
      return this.getTodoForToday();
    },
    getAll: function () {
      var deferred = $q.defer();
      $http.get(BASE_BACK_END_URL + '.json')
        .success(function(data) {
          deferred.resolve(data.tasks);
        })
        .error(function(err) {
          deferred.reject(err.message);
        });
      return deferred.promise;
    },
    getTodoForToday: function () {
      var deferred = $q.defer();
      // Get one task doesn't exist
      $http.get(BASE_BACK_END_URL + '/0.json')
        .success(function(data) {
          deferred.resolve(data.tasks);
        })
        .error(function(err) {
          deferred.reject(err.message);
        });
      return deferred.promise;
    },
    add: function (task) {
      var deferred = $q.defer();
      $http.post(BASE_BACK_END_URL + '.json', task)
        .success(function(data) {
          deferred.resolve(data.message);
        })
        .error(function(err) {
          deferred.reject(err.message);
        });
      return deferred.promise;
    },
    edit: function (task) {
      var deferred = $q.defer();
      $http.put(BASE_BACK_END_URL + '/' + task.id + '.json', task)
        .success(function(data) {
          deferred.resolve(data.message);
        })
        .error(function(err) {
          deferred.reject(err.message);
        });
      return deferred.promise;
    },
  };

}]);
