myApp.factory('doGoodFactory', ['$http', function ($http) {
  console.log('doGood Factory online!');

  var user = undefined;
  var creds = undefined;

  function getAWSCredentials() {
    return $http.get('/s3').then(function (response) {
      creds = response.data;

    });
  }

  function refreshUserData() {
    var promise = $http.get('/user').then(function (response) {

      user = response.data;
      console.log('user data set:', user);

    });

    return promise;

  }

  var publicApi = {
    factoryRefreshUserData: function () {
      return refreshUserData();
    },

    factoryGetUserData: function () {
      return user;
    },

    factoryClearUser: function () {
      user = undefined;
    },

    factorySaveUser: function (newUser) {
      user = newUser;
    },

    refreshSettings: function () {
      return getAWSCredentials();
    },

    getSettings: function () {
      return creds;
    }

  };
  return publicApi;
}]);
