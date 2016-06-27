myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
  $scope.user = {
    username: '',
    password: ''
  };
  $scope.message = '';

  $scope.login = function () {
    if ($scope.user.username === '' || $scope.user.password === '') {
      $scope.message = 'Please enter a valid username and password';
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/', $scope.user).then(function (response) {
        if (response.data.username) {
          console.log('success: ', response.data);

          // location works with SPA (ng-route)
          $location.path('/landingpage');
        } else {
          console.log('failure: ', response);
          $scope.message = 'Username/Password combination not found';
        }
      });
    }
  };

  $scope.registerUser = function () {
    if ($scope.user.username === '' || $scope.user.password === '') {
      $scope.message = 'Please enter in all required information';
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/register', $scope.user).then(function (response) {
        console.log('success');
        $location.path('/login');
      },

      function (response) {
        console.log('error');
        $scope.message = 'Please checkout try again';
      });
    }
  };
}]);
