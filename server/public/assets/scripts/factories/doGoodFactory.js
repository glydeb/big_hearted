myApp.factory('BhhFactory', ['$http', function ($http) {
  console.log('Factory running');
  var user = undefined;

  function refreshUserData () {
    var promise = $http.get('/user').then(function(response) {

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
      }
  };
  return publicApi;
}]);
