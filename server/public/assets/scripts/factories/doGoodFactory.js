myApp.factory('doGoodFactory', ['$http', function ($http) {
  console.log('doGood Factory online!');

  var user = undefined;
  refreshUserData();

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
    }

  };
  return publicApi;
}]);
