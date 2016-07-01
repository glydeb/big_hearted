myApp.controller('communityroomController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  console.log('checking user');

  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.userName = doGoodFactory.factoryGetUserData().username;
    });
  } else {
    $scope.userName = doGoodFactory.factoryGetUserData().username;
  }

}]);
