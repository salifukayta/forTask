// cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
// cordova plugin add de.appplant.cordova.plugin.local-notification

var ftApp = angular.module('ftApp', ['ionic', 'ngCordova', 'ionic-timepicker'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        window.plugin.notification.local.promptForPermission();
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (device.platform === "iOS") {
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      //FIXME to test this with $scope.$on("$cordovaLocalNotification:clicked", function (e, notification) in AppCtrl
      // window.plugin.notification.local.onclick = function (id, state, json) {
      //   var notification = {
      //     id: id,
      //     state: state,
      //     json: json
      //   };
      //   console.log('app.click', notification);
      //   $timeout(function() {
      //     $rootScope.$broadcast("$cordovaLocalNotification:click", notification);
      //   });
      // };


    });
  })
  // .constant('BASE_BACK_END_URL', 'http://localhost/fortask/api/tasks')
  //  .constant('BASE_BACK_END_URL', 'http://192.168.1.30/fortask/api/tasks')
  .constant('BASE_BACK_END_URL', 'http://fortask.3dchris.com/api/tasks')

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, ionicTimePickerProvider) {

    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60)),
      format: 24,
      step: 15,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);

    $httpProvider.defaults.headers.common = {'Content-Type': 'application/json'};

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController as AppCtrl'
      })
      .state('app.task', {
        url: '/task/{isAddMode}',
        views: {
          'menuContent': {
            templateUrl: 'templates/task/index.html',
            controller: 'TaskController as taskCtrl'
          }
        },
        // params: {isAddMode: true}
      })

      // .state('task.check', {
      //   url: '/check',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/task/index.html',
      //       controller: 'TaskController as taskCtrl'
      //     }
      //   },
      //   params: {isAddMode: false}
      // })
      .state('app.history', {
        url: '/history',
        views: {
          'menuContent': {
            templateUrl: 'templates/task/history.html',
            controller: 'HistoryController as historyCtrl'
          }
        }
      })
      .state('app.option', {
        url: '/option',
        views: {
          'menuContent': {
            templateUrl: 'templates/option/index.html',
            controller: 'OptionController as optionCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/app/task/true');
  });
