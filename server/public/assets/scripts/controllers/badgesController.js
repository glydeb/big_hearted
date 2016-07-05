
myApp.controller('badgesController', ['doGoodFactory', '$scope', '$http',
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

  $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();
    });

  $scope.changeBadge = function () {
    document.getElementById('badge1').id = 'badge1New';
  };

}]);
