'use strict';

module.exports = function (app) {
  app.controller('tagsController', ['$scope','tagsService', function ($scope,tagsService) {
    $scope.greeting = 'D3Tags example';

    tagsService.getData().then(function (data, status) {
      console.log(data)
    })
  }]);
};
