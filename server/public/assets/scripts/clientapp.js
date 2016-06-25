var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
<<<<<<< HEAD
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "landingpageController"
=======
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
>>>>>>> thomas_branch
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);
