myApp.controller('badgesController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

$scope.badges = {};
$scope.user = {};
getBadges();

  console.log('checking user');

  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.user = doGoodFactory.factoryGetUserData();

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

  }

  $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal();
    });

  $scope.changeBadge = function () {
    document.getElementById('badge1').id = 'badge1New';

  };
function getBadges() {
  $http.get('/badges/' + $scope.user.verification).then(function(response) {
    $scope.badges = response.data[0];
    console.log($scope.badges);
  });
}
}]);
