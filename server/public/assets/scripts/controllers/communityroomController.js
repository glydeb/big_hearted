myApp.controller('communityroomController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  console.log('checking user');
  $scope.post = {
    dgd: false,
    dgdnumber: 0,
    anonymous: false,
    likes: 0
  };
  $scope.updatedPost = {};
  $scope.user = {};
  $scope.communityPosts = [];

  refreshCommunityRoom();

  $scope.flagPost = function (post) {
    post.flagged = true;
    $http.put('/post/' + post._id, post).then(function(response) {
      console.log('updated post');
      refreshCommunityRoom();
    })
  }

  $scope.sendPost = function (post) {
    $scope.post.user_verify = $scope.user.verification;
    $scope.post.username = $scope.user.username;

    if ($scope.post.dgd === true) {
      $scope.user.dgdnumber += 1;

      //moved to register route to avoid confusion - register handles users
      $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
        console.log("Successfully posted");
        refreshCommunityRoom();
      });
    };
    console.log($scope.post);
    $http.post('/post', $scope.post).then(function(response) {
      console.log("Successfully posted");
      post.description = '';
      post.dgd = false;
      post.anonymous = false;
      refreshCommunityRoom();
    });
  }

  function refreshCommunityRoom () {
    $http.get('/post').then(function(response) {
      $scope.communityPosts = response.data;
      $scope.communityPosts.forEach(function (post) {
        if (post.anonymous === true) {
          post.username = 'Anonymous';
          post.image = '/assets/images/mickeyanonymous.jpg';
        };
      });
    });
  };

  $scope.likePost = function (post) {
    $scope.updatedPost = {};
    $scope.updatedPost = post;
    $scope.updatedPost = $scope.updatedPost.likes++;
    $http.put('/post/' + $scope.updatedPost._id, $scope.updatedPost).then(function(response) {
      console.log('You liked this crap?');
      refreshCommunityRoom();
    })
  }

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

}]);
