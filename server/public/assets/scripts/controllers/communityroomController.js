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

  $scope.userImages = {};
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
          $scope.flaggedUser.timesflagged += 1;
          $http.put('/register/' + $scope.flaggedUser.verification, $scope.flaggedUser).then(function(response) {
            console.log('Posted update to the user');
            refreshCommunityRoom();
          });
        });
        $http.put('/post/' + post._id, post).then(function(response) {
          console.log('updated post');
          refreshCommunityRoom();
        }, function(err) {
          console.log('Error updating post');
        });
      }
      else {
        return;
      }
    }
  };

  function refreshCommunityRoom () {
    $http.get('/post').then(function(response) {
      $scope.communityPosts = response.data;
      var postUsers = [];
      $scope.communityPosts.forEach(function (post) {
        if (post.anonymous === true) {
          post.imageRef = 'anonymous';
        } else {
          post.imageRef = post.user_verify;
          postUsers.push(post.imageRef);
        }
      });
      var userString = postUsers.join();
      $http.get('/register/flagged/' + userString).then(function(response) {
          var usersWithPosts = response.data;
          $scope.userImages.anonymous =  'https://s3.amazonaws.com/bighearted/images/multiple-users-silhouette.png';
          usersWithPosts.forEach(function (user) {
            $scope.userImages[user.verification] = user.image;
          });
      }, function(err) {
          console.log('Error loading posting users:', err);
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
    $scope.postloading = true;
    $scope.post.user_verify = $scope.user.verification;
    if (post.anonymous) {
      $scope.post.username = "One of our families";
    } else {
      $scope.post.username = $scope.user.username;
    }
    $scope.post.postedDate = new Date();

    // CHANGE TO USE ENVIRONMENT - REQUEST FROM SERVER
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

    if ($scope.file) {
      // Perform File Size Check First
      var fileSize = Math.round(parseInt($scope.file.size));
      if (fileSize > $scope.sizeLimit) {
        console.log('size limit exceeded');
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
            $scope.postloading = false;
            if ($scope.post.dgd === true && $scope.user.dgdnumber !== 12) {
                $scope.user.dgdnumber += 1;
                $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                    console.log("Successfully updated dgd count - call refresh");
                    refreshCommunityRoom();

                });
            } else {
              console.log('Call refresh');
              refreshCommunityRoom();
            }

            post.description = '';
            post.dgd = false;
            post.anonymous = false;
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

    } else {
      $http.post('/post', $scope.post).then(function(response) {
        if ($scope.post.dgd === true && $scope.user.dgdnumber !== 12) {
            $scope.user.dgdnumber += 1;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log("Successfully posted");
                refreshCommunityRoom();
            });
        } else {
          refreshCommunityRoom();
        }

        console.log("Successfully posted");
        post.description = '';
        post.dgd = false;
        post.anonymous = false;
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

  $(document).ready(function() {
      $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: 0.95
      });
      console.log("picture modal");
  });

  //pagination functionality (taken from stackoverflow)??
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    // $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.communityPosts.length/$scope.pageSize);
    };
    // for (var i=0; i<45; i++) {
    //     $scope.data.push("Item "+i);
    // }

}]);
