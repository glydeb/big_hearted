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
        refreshOurProfile();

        $scope.sendPost = function(post) {
            $scope.post.user_verify = $scope.user.verification;
            $scope.post.username = $scope.user.username;

            if ($scope.post.dgd === true) {
                $scope.user.dgdnumber += 1;
                $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                    console.log("Successfully posted");
                    refreshOurProfile();
                });
            };
            console.log($scope.post);
            $http.post('/post', $scope.post).then(function(response) {
                console.log("Successfully posted");
                post.description = '';
                post.dgd = false;
                post.anonymous = false;
                refreshOurProfile();
            });
        }

        function refreshOurProfile() {
            $http.get('/post').then(function(response) {
                $scope.profilePosts = response.data;
                $scope.profilePosts.forEach(function(post) {
                    if (post.anonymous === true) {
                        post.username = 'Anonymous';
                        post.image = '/assets/images/mickeyanonymous.jpg';
                    };
                });
            });
        };

        $(document).ready(function() {
            $('.materialboxed').materialbox();
            console.log('materialbox');
        });

        console.log('checking user');

        // go to factory to verify user
        if (doGoodFactory.factoryGetUserData() === undefined) {
            doGoodFactory.factoryRefreshUserData().then(function() {
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
        };
    }
]);
