myApp.controller('communityroomController', ['doGoodFactory', '$scope', '$http', '$window', '$location', function (doGoodFactory, $scope, $http, $window, $location) {

  console.log('checking user');
  $scope.post = {
    dgd: false,
    dgdnumber: 0,
    anonymous: false,
    likes: [],
    flagged: false,
    postedDate: new Date()
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

  // create a post
  $scope.sendPost = function (post) {
    $scope.post.user_verify = $scope.user.verification;
    $scope.post.username = $scope.user.username;
    $scope.post.postedDate = new Date();

    if ($scope.post.dgd === true) {
        $scope.user.dgdnumber += 1;
        $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
            console.log("Successfully posted");
            refreshOurProfile();
        });
    }

    // CHANGE TO USE ENVIRONMENT - REQUEST FROM SERVER
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
    console.log($scope.file);

    if ($scope.file) {
      // Perform File Size Check First
      var fileSize = Math.round(parseInt($scope.file.size));
      if (fileSize > $scope.sizeLimit) {
        console.log('size limit exceeded');
        toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
        return false;
      }

      // create new image name - 6-character verification code plus
      // post timestamp plus existing file extension.
      var newName = $scope.user.verification + '_' +
        $scope.post.postedDate.toISOString().replace(/[\W_]/g,'') +
        $scope.file.name.substr($scope.file.name.lastIndexOf('.'));
      $scope.file.name = newName;

      var params = { Key:  'images/' + newName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
      $scope.post.image = $scope.prefix + newName;

      bucket.putObject(params, function(err, data) {
        if(err) {
          console.log(err);
          // toastr.error(err.message,err.code);
          return false;
        }
        else {
          // Upload Successfully Finished
          console.log('file upload finished');
          // toastr.success('File Uploaded Successfully', 'Done');

          $http.post('/post', $scope.post).then(function(response) {
            console.log("Successfully posted");
            post.description = '';
            post.dgd = false;
            post.anonymous = false;
            refreshCommunityRoom();
          });
          /* disable progress bar
          // Reset The Progress Bar
          setTimeout(function() {
            $scope.uploadProgress = 0;
            $scope.$digest();
          }, 4000); */
        }
      });
        /* disable progress Bar
        .on('httpUploadProgress',function(progress) {
        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
        $scope.$digest();
      }); */
      }
      else {
        $http.post('/post', $scope.post).then(function(response) {
          console.log("Successfully posted");
          post.description = '';
          post.dgd = false;
          post.anonymous = false;
          refreshCommunityRoom();
        });
        // No File Selected
        console.log('No file submitted');
        //toastr.error('Please select a file to upload');
      }
  };


  $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

  $scope.initMaterialbox = function() {
    $('.materialboxed').materialbox();
  };

}]);
