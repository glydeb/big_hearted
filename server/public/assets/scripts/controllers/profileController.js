myApp.controller('profileController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $(document).ready(function () {
    $('.materialboxed').materialbox();
    console.log('materialbox');
  });

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
