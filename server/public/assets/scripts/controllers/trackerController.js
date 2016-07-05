myApp.controller('trackerController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  console.log('checking user');

  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.userName = doGoodFactory.factoryGetUserData().username;

      // if it's still undefined after refresh, send them to login page
      if ($scope.userName === undefined || $scope.userName === '') {
        $location.path('/home');
      }
    });
  } else {
    $scope.userName = doGoodFactory.factoryGetUserData().username;
    if ($scope.userName === undefined || $scope.userName === '') {
      $location.path('/home');
    }

  }


  http.get(post/:id) {


  }


  $scope.image1 = false;
  $scope.image2 = false;
  $scope.image3 = false;
  $scope.image4 = false;
  $scope.image5 = false;
  $scope.image6 = false;
  $scope.image7 = false;
  $scope.image8 = false;
  $scope.image9 = false;
  $scope.image10 = false;
  $scope.image11 = false;
  $scope.image12 = false;
  $scope.image13 =false;
}]);
