var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "LoginController",
      reloadOnSearch: false
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController",
      reloadOnSearch: false
    })
    .when('/landingpage', {
      templateUrl: '/views/landingpage.html',
      controller: "landingpageController"
    })
    .when('/communityroom', {
      templateUrl: '/views/communityroom.html',
      controller: "communityroomController",
      reloadOnSearch: false
    })
    .when('/tracker', {
      templateUrl: '/views/tracker.html',
      controller: "trackerController",
      reloadOnSearch: false
    })
    .when('/profile', {
      templateUrl: '/views/profile.html',
      controller: "profileController",
      reloadOnSearch: false
    })
    .when('/badges', {
      templateUrl: '/views/badges.html',
      controller: "badgesController",
      reloadOnSearch: false
    })
    .when('/admin', {
      templateUrl: '/views/admin.html',
      controller: "adminController",
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: 'login'
    })

}]);
