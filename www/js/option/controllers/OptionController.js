/**
 * Created by Salifukayta on 16/04/2016.
 */

ftApp.controller('OptionController', ['$scope', '$localstorage', 'ionicTimePicker', 'notificationService',
  function ($scope, $localstorage, ionicTimePicker, notificationService) {

    this.currentUser = 'Chris';
    this.morningTimeReminder = null;
    this.eveningTimeReminder = null;
    var _this = this;

    $scope.$on('$ionicView.enter', function (e) {
      _this.morningTimeReminder = $localstorage.getDate('morningTimeReminder');
      _this.eveningTimeReminder = $localstorage.getDate('eveningTimeReminder');
      if ($localstorage.get("user") != null) {
        _this.currentUser = $localstorage.get("user");
      }
    });

    this.saveUser = function () {
      $localstorage.set("user", this.currentUser);
    };

    //TODO custom css
    this.pickMorningTimeReminder = function () {
      ionicTimePicker.openTimePicker({
        callback: function (val) {
          _this.morningTimeReminder = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ',
            _this.morningTimeReminder.getUTCHours(), 'H :', _this.morningTimeReminder.getUTCMinutes(), 'M');
          $localstorage.set('morningTimeReminder', _this.morningTimeReminder);
          notificationService.setMorningReminder(_this.morningTimeReminder);
        },
        inputTime: ((_this.morningTimeReminder.getUTCHours() * 60 * 60 + _this.morningTimeReminder.getUTCMinutes() * 60)),
      });
    };

    this.pickEveningTimeReminder = function () {
      ionicTimePicker.openTimePicker({
        callback: function (val) {
          _this.eveningTimeReminder = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ',
            _this.eveningTimeReminder.getUTCHours(), 'H :', _this.eveningTimeReminder.getUTCMinutes(), 'M');
          $localstorage.set('eveningTimeReminder', _this.eveningTimeReminder);
          notificationService.setEveningReminder(_this.eveningTimeReminder);
        },
        inputTime: ((_this.eveningTimeReminder.getUTCHours() * 60 * 60 + _this.eveningTimeReminder.getUTCMinutes() * 60)),
      });
    };

  }
]);
