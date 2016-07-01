myApp.controller('adminController', ['doGoodFactory','$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.verification = '';

  $(document).ready(function(){
    $('.modal-trigger').leanModal();
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

  $scope.generateCode = function () {
    $http.get('/verification').then(function (response) {
      console.log('generateCode response', response);
      $scope.verification = response.data.verification;
    });
  };

}]);
