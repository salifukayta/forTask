/**
 * Created by Salifukayta on 16/04/2016.
 */

ftApp.controller('AppController', ['$scope', '$state', '$localstorage', '$cordovaLocalNotification', '$window', 'notificationService',
  function ($scope, $state, $localstorage, $cordovaLocalNotification, $window, notificationService) {

    var defaultDateTaskReminder = new Date();
    defaultDateTaskReminder.setHours(8);
    if ($localstorage.get('morningTimeReminder') === null) {
      $localstorage.set('morningTimeReminder', defaultDateTaskReminder);
    }

    defaultDateTaskReminder.setHours(20);
    if ($localstorage.get('eveningTimeReminder') === null) {
      $localstorage.set('eveningTimeReminder', defaultDateTaskReminder);
    }

    if ($window.cordova !== undefined && !$cordovaLocalNotification) {

      $cordovaLocalNotification.isScheduled(notificationService.getMorningNotificationId()).then(function (isScheduled) {
        if (!isScheduled) {
          notificationService.setMorningReminder($localstorage.getDate('morningTimeReminder'));
        }
      });

      $cordovaLocalNotification.isScheduled(notificationService.getEveningNotificationId()).then(function (isScheduled) {
        if (!isScheduled) {
          notificationService.setMorningReminder($localstorage.getDate('eveningTimeReminder'));
        }
      });

      // $scope.$on("$cordovaLocalNotification:clicked", function (e, notification) {
      cordova.plugins.notification.local.on("click", function (notification) {
        console.log(notification, ' clicked');
        if (notification.id === notificationService.getMorningNotificationId) {
          $state.go('app.task', {'isAddMode': 'true'});
        } else if (notification.id === notificationService.getEveningNotificationId) {
          $state.go('app.task', {'isAddMode': 'false'});
        }
      }, this);
    }


  }
]);
