myApp.controller('profileController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function(doGoodFactory, $scope, $http, $window, $location) {

  console.log('profileController running');

  $scope.user = {};
  $scope.edit = false;
  $scope.visible = true;
  $scope.sizeLimit      = 2117152; // 2MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};
  $scope.prefix = 'https://s3.amazonaws.com/bighearted/images/';

  // get upload settings
  if (doGoodFactory.getSettings() === undefined) {
    doGoodFactory.refreshSettings().then(function () {
      $scope.creds = doGoodFactory.getSettings();
      console.log('refreshed creds: ', $scope.creds);

      // aws settings
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'us-east-1';

    });
  } else {
    $scope.creds = doGoodFactory.getSettings();

    // aws settings
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
  }

  $scope.toggle = function() {
    $scope.visible = !$scope.visible;
    $scope.edit = !$scope.edit;
    if ($scope.visible) {

      if ($scope.profileFile) {
        $scope.pictureloading = true;
        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.profileFile.size));
        if (fileSize > $scope.sizeLimit) {
          console.log('size limit exceeded');
          alert('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
        } else {

          var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
          // create new image name - 6-character verification code plus
          // existing file extension.
          $scope.newName = $scope.user.verification + '_' +
            $scope.post.postedDate.toISOString().replace(/[\W_]/g,'') +
            $scope.profileFile.name.substr($scope.profileFile.name.lastIndexOf('.'));
          $scope.profileFile.name = $scope.newName;

          var params = {
            Key:  'images/' + $scope.newName,
            ContentType: $scope.profileFile.type,
            Body: $scope.profileFile,
            ServerSideEncryption: 'AES256'
          };

          bucket.putObject(params, function(err, data) {
            if(err) {
              console.log(err);
              // toastr.error(err.message,err.code);
              return false;
            } else {
              // Upload Successfully Finished
              console.log('file upload finished');
              $scope.user.image = $scope.prefix + $scope.newName;
              // toastr.success('File Uploaded Successfully', 'Done');
              $http.put('/register/' + $scope.user.verification,
                $scope.user).then(function(response) {
                  $scope.pictureloading = false;
                console.log('family info saved');
                refreshOurProfile();
              });
            }
          });
        }
      } else {
        // No File Selected
        console.log('No file submitted');
        //toastr.error('Please select a file to upload');
        $http.put('/register/' + $scope.user.verification,
          $scope.user).then(function(response) {
          console.log('family info saved');
          refreshOurProfile();
        });
      }

    }
  };

  $scope.post = {
    dgd: false,
    dgdnumber: 0,
    anonymous: false,
    likes: [],
    flagged: false,
    postedDate: new Date()
  };

  $scope.profilePosts = [];

  $scope.getFile = function () {
    doGoodFactory.readAsDataUrl($scope.file, $scope)
      .then(function(result) {
          $scope.imageSrc = result;
      });
  };

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


    if ($scope.file) {
      // Perform File Size Check First
      var fileSize = Math.round(parseInt($scope.file.size));
      if (fileSize > $scope.sizeLimit) {
        console.log('size limit exceeded');
        alert('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
        return false;
      }

      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
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
            $scope.postloading = false;
            $scope.pictureloading = false;
            if (post.dgd) {
              $scope.user.dgdnumber++;
              $http.put('/register/' + $scope.user.verification,
                $scope.user).then(function (response) {
                  console.log('update to dgdnumber successful');
              });
            }
            console.log("Successfully posted");

            if ($scope.post.dgd === true && $scope.user.dgdnumber !== 12) {
                $scope.user.dgdnumber += 1;
                $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                    console.log("Successfully posted");

                    refreshOurProfile();
                });
            } else {
              refreshOurProfile();
            }
            $scope.post.description = '';
            $scope.post.dgd = false;
            $scope.post.anonymous = false;
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
        $scope.postloading = false;
        $scope.pictureloading = false;
        if (post.dgd) {
          $scope.user.dgdnumber++;
          $http.put('/register/' + $scope.user.verification,
            $scope.user).then(function (response) {
              console.log('update to dgdnumber successful');
          });
        }
        console.log("Successfully posted");
        if ($scope.post.dgd === true && $scope.user.dgdnumber !== 12) {
            $scope.user.dgdnumber += 1;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log("Successfully posted");
                $scope.postloading = false;
                refreshOurProfile();
            });
        } else {
          refreshOurProfile();
        }
        $scope.post.description = '';
        $scope.post.dgd = false;
        $scope.post.anonymous = false;
      });
      // No File Selected
      console.log('No file submitted');
      //toastr.error('Please select a file to upload');
    }
  };

  function refreshOurProfile() {
    $http.get('/post/' +
      $scope.user.verification).then(function(response) {
      $scope.profilePosts = response.data;
    });
  }

  console.log('checking user');

  // go to factory to verify user
  if (doGoodFactory.factoryGetUserData() === undefined) {
      doGoodFactory.factoryRefreshUserData().then(function() {
          $scope.user = doGoodFactory.factoryGetUserData();
          // if it's still undefined after refresh, send them to login page
          if ($scope.user.username === undefined || $scope.user.username === '') {
              $location.path('/home');
          }
          refreshOurProfile();
      });
  } else {
      $scope.user = doGoodFactory.factoryGetUserData();
      if ($scope.user.username === undefined || $scope.user.username === '') {
          $location.path('/home');
      }
      refreshOurProfile();
  }

  $(document).ready(function() {
      $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: .95
      });
      console.log("picture modal");
  });

}]);
