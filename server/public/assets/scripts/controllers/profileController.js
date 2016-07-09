myApp.controller('profileController', ['doGoodFactory', '$scope', '$http',
    '$window', '$location',
    function(doGoodFactory, $scope, $http, $window,
        $location) {

        console.log('profileController running');


        $scope.user = {};
        $scope.user.family_members = "Click edit to add members to your family";
        $scope.user.about_us = "Click edit to write a bio about your family";
        $scope.user.our_projects = "Click edit to showcase your recent projects";
        $scope.edit = false;
        $scope.visible = true;
        $scope.sizeLimit = 2117152; // 2MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds = {};
        $scope.prefix = 'https://s3.amazonaws.com/bighearted/images/';
        //THIS IS THE CODE FOR UPLOADING IMAGES AND GETTING OUR AWS CREDENTIALS
        // getAWSCredentials();
        //
        // $scope.uploadImage = function () {
        //   // CHANGE TO USE ENVIRONMENT - REQUEST FROM SERVER
        //   AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
        //   AWS.config.region = 'us-east-1';
        //   var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
        //   console.log($scope.file);
        //
        //   if ($scope.file) {
        //       // Perform File Size Check First
        //       var fileSize = Math.round(parseInt($scope.file.size));
        //       if (fileSize > $scope.sizeLimit) {
        //         toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
        //         return false;
        //       }
        //
        //  SCOPE.FILE.TYPE IS NOT THE .JPG I THINK IT IS, PULL EVERYTHING AFTER THE DOT OFF THE FILE STRING
        //  filename.substr(filename.lastIndexOf('.')+1) leave off the +1 i if i want the dot, which i most likely will.
        //       var params = { Key:  'images/' + $scope.user.verification, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
        //       $scope.post.image = $scope.prefix + $scope.file.name;
        //
        //       bucket.putObject(params, function(err, data) {
        //         if(err) {
        //           toastr.error(err.message,err.code);
        //           return false;
        //         }
        //         else {
        //           // Upload Successfully Finished
        //           toastr.success('File Uploaded Successfully', 'Done');
        //
        //           // Reset The Progress Bar
        //           setTimeout(function() {
        //             $scope.uploadProgress = 0;
        //             $scope.$digest();
        //           }, 4000);
        //         }
        //       })
        //       .on('httpUploadProgress',function(progress) {
        //         $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
        //         $scope.$digest();
        //       });
        //       console.log(test);
        //     }
        //     else {
        //       // No File Selected
        //       console.log('No file submitted');
        //       //toastr.error('Please select a file to upload');
        //     }
        // }

        function getAWSCredentials() {
            $http.get('/s3').then(function(response) {
                $scope.creds = response.data;

            });
        }

        $scope.toggle = function() {
            $scope.visible = !$scope.visible;
            $scope.edit = !$scope.edit;
            if ($scope.visible) {
                $http.put('/register/' + $scope.user.verification,
                    $scope.user).then(function(response) {
                    console.log('family info saved');
                });
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

        $scope.sendPost = function(post) {
            $scope.post.user_verify = $scope.user.verification;
            $scope.post.username = $scope.user.username;
            $scope.loading = true;

            if ($scope.post.dgd === true) {
                $scope.user.dgdnumber += 1;
                $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                    console.log("Successfully posted");
                    refreshOurProfile();
                });
            }
            console.log($scope.post);
            $http.post('/post', $scope.post).then(function(response) {
                console.log("Successfully posted");
                post.description = '';
                post.dgd = false;
                post.anonymous = false;
                $scope.loading = false;
                refreshOurProfile();
            });
        };

        function refreshOurProfile() {
            $http.get('/post/' +
                $scope.user.verification).then(function(response) {
                $scope.profilePosts = response.data;
                $scope.profilePosts.forEach(function(post) {
                    if (post.anonymous === true) {
                        post.username = 'Anonymous';
                        post.image = '/assets/images/mickeyanonymous.jpg';
                    }
                });
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

    }
]);
