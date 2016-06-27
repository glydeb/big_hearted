myApp.controller('landingpageController', ['$scope', '$http', '$window',
  '$location', function ($scope, $http, $window, $location) {
    $scope.downloadsArray = [];
    getDownloads();

    function getDownloads () {
    $http.get('/download').then(function (response) {
      console.log('getting downloads');
      console.log(response.data);
      $scope.downloadsArray = response.data;
    });
  };

  // This happens after view/controller loads -- not ideal
  console.log('checking user');
  $http.get('/user').then(function (response) {
    if (response.data.username) {
      $scope.userName = response.data.username;
      console.log('User Data: ', $scope.userName);
    } else {
      $location.path('/home');
    }
  });

  $scope.logout = function () {
    $http.get('/user/logout').then(function (response) {
      console.log('logged out');
      $location.path('/home');
    });
  };
}]);
