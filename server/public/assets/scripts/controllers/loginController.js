myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
  $scope.user = {
    username: '',
    password: '',
    is_admin: false,
    textnotifications: false
  };
  $scope.message = '';

  // variable to allow form submission - not used yet
  // $scope.complete = false;

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
      $scope.message = 'Please enter all required information';
    } else if ($scope.user.password !== $scope.user.password2) {
      $scope.message = 'Passwords do not match - please re-type';
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

$(".dropdown-button").dropdown();

}]);
