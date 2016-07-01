myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
  $scope.user = {
    username: '',
    password: '',
    is_admin: false,
    textnotifications: false
  };
  $scope.message = '';
  $scope.mismatch = false;

  // select elements need jQuery to work properly
  $(document).ready(function () {
    $('select').material_select();
  });

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

    // username & password are required
    if ($scope.user.username === '' || $scope.user.password === '') {
      $scope.message = 'Please enter all required information';

    // check if verify password matches original password
    } else if ($scope.user.password !== $scope.user.password2) {
      $scope.message = 'Passwords do not match - please re-type';

    // process registration
    } else {

      // check verification code
      var candidate = $scope.user.verification;
      $http.get('/verification/' + candidate).then(function (response) {
        console.log('code checked, returning:', response.data.result);
        if (response.data.result) {

          // all checks passed - create user
          $http.post('/register', $scope.user).then(function (response) {
            console.log('success');
            $location.path('/login');
          },

          function (response) {
            console.log('Registration error', response);
            $scope.message = 'Registration failed - please try again';
          });

        } else {
          $scope.message = 'Verification code not found or no longer valid';
        }

      },

      function (response) {
        console.log('code verification error', response);
        $scope.message = 'Code verification failed - please check your code';
      });

    }
  };

$(".dropdown-button").dropdown();

  $scope.comparePassword = function () {
    if ($scope.user.password !== $scope.user.password2) {
      $scope.mismatch = true;
      $scope.password = '';
      $scope.password2 = '';
    } else {
      $scope.mismatch = false;
    }
  };

}]);
