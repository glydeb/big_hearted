myApp.controller('badgesController', ['$scope', '$http', '$window', '$location', 'BhhFactory', function($scope, $http, $window, $location, BhhFactory) {
  // This happens after view/controller loads -- not ideal
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/home");
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }
}]);
