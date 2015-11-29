'use strict';

module.exports = function (app) {
  app.controller('tagsController', ['$scope','$http','constants', function ($scope,$http,constants) {
    $scope.greeting = 'D3Tags example';
    $scope.loadTags = function() {
      return $http.get(constants.production + 'emotions?lang_code=en&limit=10&token=' + constants.token).then(function(res) {
        return res.data;
      })
    };

    $scope.myOnClickFunction = function(element) {
      console.log(element)
    };

    $scope.myOnHoverFunction = function(element) {
      console.log(element)
    };



  }]);
};
