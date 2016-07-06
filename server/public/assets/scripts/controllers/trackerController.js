myApp.controller('trackerController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.user={};
  console.log('checking user');

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
  $scope.image13 = false;

  var trackerCount  = 0;
  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.user = doGoodFactory.factoryGetUserData();
      trackerCount = $scope.user.dgdnumber;
      progressCheck();

      // if it's still undefined after refresh, send them to login page
      if ($scope.user.username === undefined || $scope.user.username === '') {
        $location.path('/home');
      }
    });
  } else {
    $scope.user = doGoodFactory.factoryGetUserData();
    if ($scope.user.username === undefined || $scope.user.username === '') {
      $location.path('/home');

    }
    trackerCount = $scope.user.dgdnumber;
    progressCheck();
}

function progressCheck() {
  switch(trackerCount) {
  case 1:
      $scope.image2 = true
      break
  case 2:
      $scope.image3 = true
      break
  case 3:
      $scope.image4 = true
      break
  case 4:
      $scope.image5 = true
      break
  case 5:
      $scope.image6 = true
      break
  case 6:
      $scope.image7 = true
      break
  case 7:
      $scope.image8 = true
      break
  case 8:
      $scope.image9 = true
      break
  case 9:
      $scope.image10 = true
      break
  case 10:
      $scope.image11 = true
      break
  case 11:
      $scope.image12 = true
      break
  case 12:
      $scope.image13 = true
      break
  case 0:
      $scope.image1 = true
      break
  default: $scope.image1 = true;
  }
}

}]);
