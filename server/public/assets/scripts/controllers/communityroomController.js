myApp.controller('communityroomController', ['$scope', '$http', '$window', '$location', 'BhhFactory', function($scope, $http, $window, $location, BhhFactory) {

  $scope.post = {
    dgd: false,
    dgdnumber: 0,
    anonymous: false,
    likes: 0
  };
  $scope.user = {};
  $scope.communityPosts = [];

  refreshCommunityRoom();

  $scope.sendPost = function (post) {
    $scope.post.user_verify = $scope.user.verification;
    $scope.post.username = $scope.user.username;

    if ($scope.post.dgd === true) {
      $scope.user.dgdnumber += 1;
      $http.put('/post/' + $scope.user.verification, $scope.user).then(function(response) {
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
    post.likes++;
    console.log(post);
    $scope.updatedPost = post;
    $http.put('/post/' + $scope.updatedPost._id, $scope.updatedPost).then(function(response) {
      console.log('You liked this crap?');
      refreshCommunityRoom();
    })
  }

  // This happens after view/controller loads -- not ideal
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.user = response.data;
          console.log('User Data: ', $scope.user.username);
      } else {
          $location.path("/home");
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }
}]);
