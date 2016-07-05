<<<<<<< HEAD
myApp.controller('badgesController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  // This happens after view/controller loads -- not ideal
=======
myApp.controller('badgesController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {
>>>>>>> 389036604a29959d4e7399a8575ac272e7057fce

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

<<<<<<< HEAD
  $(document).ready(function() {
    $('.modal-trigger').leanModal();
=======
  $(document).ready(function () {
    $('.parallax').parallax();
>>>>>>> 389036604a29959d4e7399a8575ac272e7057fce
  });

$scope.changeBadge = function(){
  document.getElementById("badge1").id = "badge1New"
}
}]);
