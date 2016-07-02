myApp.controller('profileController', ['$scope', '$http', '$window',
  '$location', function ($scope, $http, $window, $location) {

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

    $(document).ready(function(){
        $('.materialboxed').materialbox();

      });



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
