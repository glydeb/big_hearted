myApp.factory('FantasyFactory', ['$http', function ($http) {
  console.log('fantasyFactory running');
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
