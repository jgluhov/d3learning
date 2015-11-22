'use strict';

module.exports = function (app) {
  app.controller('homeController', ['$scope', function ($scope) {
    $scope.greeting = 'D3Learning';
  }]);
};
