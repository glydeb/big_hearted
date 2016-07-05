myApp.controller('adminController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.verification = '';

  $(document).ready(function () {
    $('.modal-trigger').leanModal();
  });

  console.log('checking user');

  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.userName = doGoodFactory.factoryGetUserData().username;

      // if it's still undefined after refresh, send them to login page
      if ($scope.userName === undefined || $scope.userName === '') {
        $location.path('/home');
      } else if (!(checkAdmin())) {
        $location.path('/landingpage');
      }
    });
  } else {
    $scope.userName = doGoodFactory.factoryGetUserData().username;
    if ($scope.userName === undefined || $scope.userName === '') {
      $location.path('/home');
    } else if (!(checkAdmin())) {
      $location.path('/landingpage');
    }

  }

  // Load flagged content
  $http.get('/post/flagged').then(function (response) {
    $scope.flaggedPosts = response.data;
  }, function (err) {
    console.log('Error loading flagged content:', err);
  });

  function checkAdmin() {
    if (doGoodFactory.factoryGetUserData().is_admin) {
      return true;
    } else {
      return false;
    }
  }

  $scope.generateCode = function () {
    $http.get('/verification').then(function (response) {
      console.log('generateCode response', response);
      $scope.verification = response.data.verification;
    });
  };

}]);
