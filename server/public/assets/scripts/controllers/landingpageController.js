myApp.controller('landingpageController', ['doGoodFactory', '$scope', '$http',
  '$window', '$location', function (doGoodFactory, $scope, $http, $window,
  $location) {

  $scope.user = {};
  $scope.file = {};
  $scope.organizationsArray = [];
  $scope.organization1 = {};
  $scope.organization2 = {};
  $scope.organization3 = {};
  $scope.visible = false;
  $scope.editableDownloads = false;
  $scope.downloadsArray = [];
  $scope.sizeLimit      = 2117152; // 2MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};
  $scope.prefix = 'https://s3.amazonaws.com/bighearted/featuredOrganizations/';
  $scope.prefix2 = 'https://s3.amazonaws.com/bighearted/downloads/';
  getDownloads();
  getAWSCredentials();
  getOrganizations();

  $scope.visibility = function () {
    if ($scope.visible) {
      $scope.visible = false;
    } else {
    $scope.visible = true;
  }
}

  $scope.editDownloads = function () {
    if ($scope.editableDownloads) {
      $scope.editableDownloads = false;
    } else {
      $scope.editableDownloads = true;
    }
  }

  $scope.saveOrgInfo = function (organization) {
    uploadImage(organization);
    $http.put('/landing/organization/' + organization._id, organization).then(function(response) {
        console.log('organization info saved');
        if ($scope.visible) {
          $scope.visible = false;
        } else {
          $scope.visible = true;
        }

    });

  }

  $scope.saveDownloadInfo = function (download) {
    uploadDownload(download);
    $http.put('/landing/download/' + download._id, download).then(function(response) {
      console.log('successfully uploaded download and updated database');
    })
  }

  function getOrganizations() {
    $http.get('/landing/organization').then(function (response) {
      $scope.organizationsArray = response.data
      $scope.organization1 = $scope.organizationsArray[0];
      $scope.organization2 = $scope.organizationsArray[1];
      $scope.organization3 = $scope.organizationsArray[2];
    });
  }

  function getAWSCredentials() {
    $http.get('/s3').then(function (response) {
      $scope.creds = response.data;
      console.log($scope.creds);
    });
  }

  function getDownloads() {
    $http.get('/landing').then(function (response) {
      console.log('getting downloads');
      $scope.download1= response.data[0];
      $scope.download2 = response.data[1];
    });
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


  //THIS IS THE CODE FOR UPLOADING IMAGES AND GETTING OUR AWS CREDENTIALS
          // getAWSCredentials();
          //
          function uploadImage (organization) {
            // CHANGE TO USE ENVIRONMENT - REQUEST FROM SERVER
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
            console.log($scope.file);

            if ($scope.file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt($scope.file.size));
                if (fileSize > $scope.sizeLimit) {
                  // toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
                  return false;
                }
                // var newName = $scope.user.verification + '_' +
                // $scope.file.name

          //  SCOPE.FILE.TYPE IS NOT THE .JPG I THINK IT IS, PULL EVERYTHING AFTER THE DOT OFF THE FILE STRING
                var filepath = organization.filepath + $scope.file.name.substr($scope.file.name.lastIndexOf('.'));
                var params = { Key:  'featuredOrganizations/' + filepath, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
                organization.image = $scope.prefix + organization.filepath + $scope.file.name.substr($scope.file.name.lastIndexOf('.'));

                console.log(params);
                bucket.putObject(params, function(err, data) {
                  if(err) {
                    // toastr.error(err.message,err.code);
                    console.log(err);
                    return false;
                  }
                  else {
                    // Upload Successfully Finished
                    // toastr.success('File Uploaded Successfully', 'Done');

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

              }
              else {
                // No File Selected
                console.log('No file submitted');
                //toastr.error('Please select a file to upload');
              }
          }


          function uploadDownload (download) {
            // CHANGE TO USE ENVIRONMENT - REQUEST FROM SERVER
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
            console.log($scope.file);

            if ($scope.file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt($scope.file.size));
                if (fileSize > $scope.sizeLimit) {
                  // toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
                  return false;
                }
                // var newName = $scope.user.verification + '_' +
                // $scope.file.name

          //  SCOPE.FILE.TYPE IS NOT THE .JPG I THINK IT IS, PULL EVERYTHING AFTER THE DOT OFF THE FILE STRING
                var filepath = download.filepath + $scope.file.name.substr($scope.file.name.lastIndexOf('.'));
                var params = { Key:  'downloads/' + filepath, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
                download.link = $scope.prefix2 + download.filepath + $scope.file.name.substr($scope.file.name.lastIndexOf('.'));

                console.log(params);
                bucket.putObject(params, function(err, data) {
                  if(err) {
                    // toastr.error(err.message,err.code);
                    console.log(err);
                    return false;
                  }
                  else {
                    // Upload Successfully Finished
                    // toastr.success('File Uploaded Successfully', 'Done');

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

              }
              else {
                // No File Selected
                console.log('No file submitted');
                //toastr.error('Please select a file to upload');
              }
          }

}]);
