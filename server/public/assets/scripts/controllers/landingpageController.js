myApp.controller('landingpageController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.user = {};
  $scope.organizationsArray = [];
  $scope.organization1 = {};
  $scope.organization2 = {};
  $scope.organization3 = {};
  $scope.visible = false;
  $scope.visible2 = false;
  $scope.visible3 = false;
  $scope.downloadsArray = [];
  $scope.sizeLimit      = 2117152; // 2MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};
  $scope.prefix = 'https://s3.amazonaws.com/bighearted/images/';
  getDownloads();
  getAWSCredentials();
  getOrganizations();

  $scope.visibility = function () {
    if ($scope.visible) {
      $scope.visible = false;
    } else {
    $scope.visible = true;
  }
}

  $scope.saveOrgInfo = function (organization) {
    $http.put('/landing/organization/' + organization._id, organization).then(function(response) {
        console.log('organization info saved');
        if ($scope.visible) {
          $scope.visible = false;
        } else {
          $scope.visible = true;
        }
    });

  }

  function getOrganizations() {
    $http.get('/landing/organization').then(function (response) {
      $scope.organizationsArray = response.data
      $scope.organization1 = $scope.organizationsArray[0];
      $scope.organization2 = $scope.organizationsArray[1];
      $scope.organization3 = $scope.organizationsArray[2];
    });
  }

  function getAWSCredentials() {
    $http.get('/s3').then(function (response) {
      $scope.creds = response.data;

    });
  }

  function getDownloads() {
    $http.get('/landing').then(function (response) {
      console.log('getting downloads');
      $scope.downloadsArray = response.data;
    });
  }


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


}]);
