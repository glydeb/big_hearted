myApp.controller('communityroomController', ['doGoodFactory', '$scope', '$http', '$window', '$location', function (doGoodFactory, $scope, $http, $window, $location) {

  $(document).ready(function(){
    $('.materialboxed').materialbox();
  });

  console.log('checking user');
  $scope.post = {
    dgd: false,
    dgdnumber: 0,
    anonymous: false,
    likes: 0,
    flagged: false
  };
  $scope.updatedPost = {};
  $scope.user = {};
  $scope.communityPosts = [];
  $scope.flaggedUser = {};

  refreshCommunityRoom();

  $scope.flagPost = function (post) {
    console.log(post);
    if (post.flagged) {
      prompt('This post has already been flagged, an admin will deal with it in due time.');
      return;
    } else {
      post.flagged = true;
      $http.get('/register/' + post.user_verify).then(function (response) {
        $scope.flaggedUser = response.data[0];
        console.log($scope.flaggedUser);
        $scope.flaggedUser.timesflagged += 1;
        $http.put('/register/' + $scope.flaggedUser.verification, $scope.flaggedUser).then(function(response) {
          console.log('Posted update to the user');
          refreshCommunityRoom();
        })
      })
    }
      $http.put('/post/' + post._id, post).then(function(response) {
        console.log('updated post');
        refreshCommunityRoom();
      });

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
    post.likes++;
    console.log(post);
    $scope.updatedPost = post;
    $http.put('/post/' + $scope.updatedPost._id, $scope.updatedPost).then(function(response) {
      console.log('You liked this crap?');
      refreshCommunityRoom();
    })
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

 $scope.initMaterialbox = function() {
   $('.materialboxed').materialbox();
   $('.material-placeholder').css('height', '150px');
   console.log('initMaterialbox');
 };

}]);
