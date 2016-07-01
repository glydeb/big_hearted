myApp.controller('navController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.logout = function () {
    $http.get('/user/logout').then(function (response) {
      console.log('logged out');
      $location.path('/home');
    });
  };
}]);
