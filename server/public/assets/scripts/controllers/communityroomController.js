myApp.controller('communityroomController', ['doGoodFactory', '$scope', '$http', '$window', '$location', function (doGoodFactory, $scope, $http, $window, $location) {

  $(document).ready(function(){
    $('.materialboxed').materialbox();
  });

  console.log('checking user');
  $scope.post = {
    dgd: false,
    dgdnumber: 0,
    anonymous: false,
    likes: [],
    flagged: false,
    date: new Date()
  };
  $scope.updatedPost = {};
  $scope.user = {};
  $scope.communityPosts = [];
  $scope.flaggedUser = {};
  $scope.sizeLimit      = 2117152; // 2MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};
  $scope.prefix = 'https://s3.amazonaws.com/bighearted/images/';

  refreshCommunityRoom();
  getAWSCredentials();

  function getAWSCredentials() {
    $http.get('/s3').then(function (response) {
      $scope.creds = response.data;

    });
  }

  $scope.flagPost = function (post) {
    console.log(post);
    if (post.flagged) {
      alert('This post has already been flagged, a site admininstrator will deal with it in due time.');
      return;
    } else {
      var response = confirm('Press Ok to flag this post for review by a site administrator, press Cancel to return to the Community Room');
      if (response) {
      post.flagged = true;
      $http.get('/register/' + post.user_verify).then(function (response) {
        $scope.flaggedUser = response.data[0];
        console.log($scope.flaggedUser);
        $scope.flaggedUser.timesflagged += 1;
        $http.put('/register/' + $scope.flaggedUser.verification, $scope.flaggedUser).then(function(response) {
          console.log('Posted update to the user');
          refreshCommunityRoom();
        });
      });
    }
    else {
      return;
    }
  }
      $http.put('/post/' + post._id, post).then(function(response) {
        console.log('updated post');
        refreshCommunityRoom();
      });

  };

  $scope.sendPost = function (post) {
    $scope.post.user_verify = $scope.user.verification;
    $scope.post.username = $scope.user.username;


//    if ($scope.file !== undefined) { uploadImage(); }

    uploadImage();
    if ($scope.post.dgd === true) {
      $scope.user.dgdnumber += 1;

      //moved to register route to avoid confusion - register handles users
      $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
        console.log("Successfully posted");
        refreshCommunityRoom();
      });
    }

    console.log($scope.post);
    $http.post('/post', $scope.post).then(function(response) {
      console.log("Successfully posted");
      post.description = '';
      post.dgd = false;
      post.anonymous = false;
      refreshCommunityRoom();
    });
  };

  function refreshCommunityRoom () {
    $http.get('/post').then(function(response) {
      $scope.communityPosts = response.data;
      $scope.communityPosts.forEach(function (post) {
        if (post.anonymous === true) {
          post.username = 'Anonymous';
          post.image = '/assets/images/mickeyanonymous.jpg';
        }
      });
    });
  }

  $scope.likePost = function (post) {
    $scope.updatedPost = post;
    var found = false;
    $scope.updatedPost.likes.forEach(function (like) {
      if (like === $scope.user.verification) {
        found = true;
        return;
      }
    });
    if (!found) {
      $scope.updatedPost.likes.push($scope.user.verification);
    }
    $http.put('/post/' + $scope.updatedPost._id, $scope.updatedPost).then(function(response) {
      console.log('updated likes');
      refreshCommunityRoom();
    });
  };

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

  function uploadImage() {
    // CHANGE TO USE ENVIRONMENT - REQUEST FROM SERVER
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
    console.log($scope.file);

    if ($scope.file) {
        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
          return false;
        }

        var params = { Key:  'images/' + $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
        $scope.post.image = $scope.prefix + $scope.file.name;

        bucket.putObject(params, function(err, data) {
          if(err) {
            toastr.error(err.message,err.code);
            return false;
          }
          else {
            // Upload Successfully Finished
            toastr.success('File Uploaded Successfully', 'Done');

            // Reset The Progress Bar
            setTimeout(function() {
              $scope.uploadProgress = 0;
              $scope.$digest();
            }, 4000);
          }
        })
        .on('httpUploadProgress',function(progress) {
          $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
          $scope.$digest();
        });
        console.log(test);
      }
      else {
        // No File Selected
        console.log('No file submitted');
        //toastr.error('Please select a file to upload');
      }
  }


  $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

  $scope.initMaterialbox = function() {
   $('.materialboxed').materialbox();
   console.log('initMaterialbox');
  };

}]);
