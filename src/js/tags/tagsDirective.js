'use strict';

module.exports = function (app) {
  app.directive('tags', ['$window', '$timeout', 'd3Service', function ($window, $timeout, d3Service) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        d3Service.d3().then(function (d3) {
          var svg = d3.select(element[0])
            .append("svg")
            .style('width', '100%');
        })
      }
    }
  }])
};
