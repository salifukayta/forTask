/**
 * Created by Salifukayta on 21/04/2016.
 */

'use strict';

ftApp.factory('notificationService', ['$cordovaLocalNotification', function ($cordovaLocalNotification) {

  var morningNotificationId = '10';
  var eveningNotificationId = '20';

  var optionMorning = {
    id: morningNotificationId,
    title: "Set Today's Tasks",
    // at: $localstorage.getDate('morningTimeReminder'),
    // text: "Jour fixe Produktionsbesprechung",
    // data: { meetingId:"#123FG8" }
  };

  var optionEvening = {
    id: eveningNotificationId,
    title: "Review Today's Tasks",
    // at: $localstorage.getDate('morningTimeReminder'),
    // text: "Jour fixe Produktionsbesprechung",
    // data: { meetingId:"#123FG8" }
  };

  return {
    setMorningReminder: function (date) {
      optionMorning.date = date;
      $cordovaLocalNotification.schedule(optionMorning).then(function () {
        console.log("The notification has been set at ", optionMorning.date);
      });
    },
    setEveningReminder: function (date) {
      optionEvening.date = date;
      $cordovaLocalNotification.schedule(optionEvening).then(function () {
        console.log("The notification has been set ", optionEvening.date);
      });
    },
    getMorningNotificationId: function () {
      return morningNotificationId;
    },
    getEveningNotificationId: function () {
      return eveningNotificationId;
    },
  }
}]);
