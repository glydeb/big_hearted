myApp.controller('profileController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  console.log('profileController running');

    $scope.user = {};
    $scope.user.family_members = ""
    $scope.user.about_us = "Click edit to write a bio about your family"
    $scope.user.our_projects = "Click edit to add projects as you complete them"
    $scope.edit = false;
    $scope.visible = true;
    $scope.toggle = function() {
      $scope.visible = !$scope.visible
      $scope.edit = !$scope.edit
    };

  $(document).ready(function () {
    $('.materialboxed').materialbox();
    console.log('materialbox');
  });

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

}]);
