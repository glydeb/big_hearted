myApp.controller('badgesController', ['doGoodFactory', '$scope', '$http',
    '$window', '$location',
    function(doGoodFactory, $scope, $http, $window,
        $location) {
        var two = bibliophile;

        $scope.user = {};

        //get user info check badges display gray if false click claim update user schema to true

        $scope.updateBadge1 = function() {
            document.getElementById('badge1').id = 'badge1New';
            $scope.user.badges.generosity = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge2 = function(badge) {
            document.getElementById('badge2').id = 'badge2New';
            $scope.user.badges.bibliophile = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge3 = function() {
            document.getElementById('badge3').id = 'badge3New';
            $scope.user.badges.smile_sharing = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge4 = function(badge) {
            document.getElementById('badge4').id = 'badge4New';
            $scope.user.badges.royalty = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge5 = function() {
            document.getElementById('badge5').id = 'badge5New';
            $scope.user.badges.creature_care = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge6 = function(badge) {
            document.getElementById('badge6').id = 'badge6New';
            $scope.user.badges.citizenship = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge7 = function() {
            document.getElementById('badge7').id = 'badge7New';
            $scope.user.badges.super_fan = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge8 = function(badge) {
            document.getElementById('badge8').id = 'badge8New';
            $scope.user.badges.happy_habits = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge9 = function() {
            document.getElementById('badge9').id = 'badge9New';
            $scope.user.badges.helpful_holiday = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge10 = function(badge) {
            document.getElementById('badge10').id = 'badge10New';
            $scope.user.badges.flash_kindness = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge11 = function() {
            document.getElementById('badge11').id = 'badge11New';
            $scope.user.badges.wilderness_hero = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };
        $scope.updateBadge12 = function(badge) {
            document.getElementById('badge12').id = 'badge12New';
            $scope.user.badges.urgent_needs = true;
            $http.put('/register/' + $scope.user.verification, $scope.user).then(function(response) {
                console.log('updated badge');
            });
        };

        function checkBadges2 () {
          $http.get('/post').then(function(response) {
            $scope.info = response.data;
              var likes = $scope.info.map(function(a) {return a.likes;});
              if (likes.length >= 1) {
                document.getElementById('badge18').id = 'badge18New';
          }
        });
}
        // go to factory to verify user
        if (doGoodFactory.factoryGetUserData() === undefined) {
            doGoodFactory.factoryRefreshUserData().then(function() {
                $scope.user = doGoodFactory.factoryGetUserData();
                checkBadges();
                checkBadges2();
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
            checkBadges();
            checkBadges2();
        }




        $(document).ready(function() {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
        });

        function generosity() {
            if ($scope.user.badges.generosity === true) {
                document.getElementById('badge1').id = 'badge1New';
            }
        }

        function bibliophile() {
            if ($scope.user.badges.bibliophile === true) {
                document.getElementById('badge2').id = 'badge2New';
            }

        }
        function smileSharing() {
            if ($scope.user.badges.citizenship === true) {
                document.getElementById('badge3').id = 'badge3New';
            }
        }
        function royalty() {
            if ($scope.user.badges.bibliophile === true) {
                document.getElementById('badge4').id = 'badge4New';
            }

        }
        function creatureCare() {
            if ($scope.user.badges.creature_care === true) {
                document.getElementById('badge5').id = 'badge5New';
            }

        }
        function citizenship() {
            if ($scope.user.badges.citizenship === true) {
                document.getElementById('badge6').id = 'badge6New';
            }
        }

        function superFan() {
            if ($scope.user.badges.super_fan === true) {
                document.getElementById('badge7').id = 'badge7New';
            }
        }

        function healthyHabits() {
            if ($scope.user.badges.happy_habits === true) {
                document.getElementById('badge8').id = 'badge8New';
            }

        }

        function helpfulHoliday() {
            if ($scope.user.badges.helpful_holiday === true) {
                document.getElementById('badge9').id = 'badge9New';
            }
        }
        function flashKindness() {
            if ($scope.user.badges.citizenship === true) {
                document.getElementById('badge10').id = 'badge10New';
            }
        }
        function wildernessHero() {
            if ($scope.user.badges.citizenship === true) {
                document.getElementById('badge11').id = 'badge11New';
            }
        }
        function urgentNeeds() {
            if ($scope.user.badges.citizenship === true) {
                document.getElementById('badge12').id = 'badge12New';
            }
        }

        function onYourWay(){
          if($scope.user.dgdnumber === 1 ){
            document.getElementById('badge13').id = 'badge13New';
          }
        }

        function halfway(){
          if($scope.user.dgdnumber === 6 ){
            document.getElementById('badge14').id = 'badge14New';
          }
        }

        function champion(){
          if($scope.user.dgdnumber === 12 ){
            document.getElementById('badge15').id = 'badge15New';
          }
        }


        function checkBadges(){
          generosity();
          bibliophile();
          smileSharing();
          royalty();
          creatureCare();
          citizenship();
          superFan();
          healthyHabits();
          helpfulHoliday();
          flashKindness();
          wildernessHero();
          urgentNeeds();
          onYourWay();
          halfway();
          champion();
        }
    }
]);
