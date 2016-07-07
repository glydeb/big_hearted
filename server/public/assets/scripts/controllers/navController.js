myApp.controller('navController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

$(document).ready(function(){
  console.log("sidenav firing");
$(".button-collapse").sideNav({
  closeOnClick: true
});
});



  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.navUser = doGoodFactory.factoryGetUserData();
    });
  } else {
    $scope.navUser = doGoodFactory.factoryGetUserData();
  }

  console.log('original value of navUser:', $scope.navUser);

  $scope.$on('$routeChangeSuccess', function () {
    console.log('update function called');
    $scope.navUser = doGoodFactory.factoryGetUserData();
    console.log('navUser set to:', $scope.navUser);
  });

  // jQuery for select element
  $(".dropdown-button").dropdown({
        hover: true, // Activate on hover
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right' // Displays dropdown with edge aligned to the left of button
      }
    );

  $scope.logout = function () {
    $http.get('/user/logout').then(function (response) {
      console.log('logged out');
      doGoodFactory.factoryClearUser();
      $location.path('/home');
    });
  };

  // $scope.initSideNav = function() {
  //     $(".button-collapse").sideNav();
  //     console.log("sidenav firing");
  //   };


}]);
