myApp.factory('doGoodFactory', ['$http', function ($http) {
  console.log('doGood Factory online!');

  var user = undefined;

  function refreshUserData() {
    var promise = $http.get('/user').then(function (response) {

      user = response.data;

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
    }

  };
  return publicApi;
}]);
