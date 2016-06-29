myApp.controller('adminController', ['$scope', '$http', '$window', '$location',
  function ($scope, $http, $window, $location) {
  $scope.verification = '';

  $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });

  // This happens after view/controller loads -- not ideal
  console.log('checking user');

  $http.get('/user').then(function (response) {
    if (response.data.username) {
      $scope.userName = response.data.username;
      console.log('User Data: ', $scope.userName);
    } else {
      $location.path('/home');
    }
  });

  $scope.logout = function () {
    $http.get('/user/logout').then(function (response) {
      console.log('logged out');
      $location.path('/home');
    });
  };

  $scope.generateCode = function () {
    $http.get('/verification').then(function (response) {
      console.log('generateCode response', response);
      $scope.verification = response.data.verification;
    });
  };

}]);
