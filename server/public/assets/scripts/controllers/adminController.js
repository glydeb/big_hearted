myApp.controller('adminController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.verification = '';

  $(document).ready(function () {
    $('.modal-trigger').leanModal();
  });

  console.log('checking user');

  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
    doGoodFactory.factoryRefreshUserData().then(function () {
      $scope.userName = doGoodFactory.factoryGetUserData().username;

      // if it's still undefined after refresh, send them to login page
      if ($scope.userName === undefined || $scope.userName === '') {
        $location.path('/home');
      } else if (!(checkAdmin())) {
        $location.path('/landingpage');
      }
    });
  } else {
    $scope.userName = doGoodFactory.factoryGetUserData().username;
    if ($scope.userName === undefined || $scope.userName === '') {
      $location.path('/home');
    } else if (!(checkAdmin())) {
      $location.path('/landingpage');
    }

  }

  // Load flagged content
  getFlagged();

  function getFlagged() {
    $http.get('/post/flagged').then(function (response) {
      $scope.flaggedPosts = response.data;
      console.log($scope.flaggedPosts);
    }, function (err) {
      console.log('Error loading flagged content:', err);
    });
  }

  function getSelected() {
    var selected = [];
    $scope.flaggedPosts.forEach(function (post, i) {
      console.log(post.selected);
      if (post.selected === true) {
        console.log(post._id);
        selected.push(post._id);
      }
    });
    return selected;
  }

  function checkAdmin() {
    if (doGoodFactory.factoryGetUserData().is_admin) {
      return true;
    } else {
      return false;
    }
  }

  $scope.generateCode = function () {
    $http.get('/verification').then(function (response) {
      console.log('generateCode response', response);
      $scope.verification = response.data.verification;
    });
  };

  $scope.clearFlags = function () {
    // iterate through flaggedPosts and add post ids to array
    var selectedArray = getSelected();
    console.log(selectedArray);
    var update = { _id: { $in: selectedArray } };
    $http.put('/post/clear', update).then(function (response) {
      console.log('clearFlags response:', response);
      getFlagged();
    });
  };

  $scope.deleteSelected = function () {
    var selectedArray = getSelected();
    var hitlist = { _id: { $in: selectedArray } };
    $http.delete('/post', hitlist).then(function (response) {
      console.log('deleteSelected response:', response);
    });
    getFlagged();
  };

}]);
