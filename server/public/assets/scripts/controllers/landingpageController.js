myApp.controller('landingpageController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.downloadsArray = [];
  getDownloads();

  function getDownloads() {
    $http.get('/download').then(function (response) {
      console.log('getting downloads');
      console.log(response.data);
      $scope.downloadsArray = response.data;
    });
  }

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
