var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/landingpage', {
      templateUrl: '/views/landingpage.html',
      controller: "landingpageController"
    })
    .when('/communityroom', {
      templateUrl: '/views/communityroom.html',
      controller: "communityroomController"
    })
    .when('/tracker', {
      templateUrl: '/views/tracker.html',
      controller: "trackerController"
    })
    .when('/profile', {
      templateUrl: '/views/profile.html',
      controller: "profileController"

    })
    .otherwise({
      redirectTo: 'login'
    })

}]);
