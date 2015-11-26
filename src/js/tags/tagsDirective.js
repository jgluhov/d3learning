'use strict';

module.exports = function (app) {
  app.directive('tags', ['$window', '$timeout', function ($window, $timeout) {
    return {
      restrict: 'EA',
      scope: {},
      link: function (scope, element, attrs) {

          var svg = d3.select(element[0])
            .append("svg")
            .style('width', '100%')
            .attr('class', 'svg-tags');

          // Browser onresize event
          $window.onresize = function () {
            scope.$apply();
          };

          // hard-code data
          scope.data = [
            {text: "Greg"},
            {text: "Ari"},
            {text: 'Q'},
            {text: "Loser"}
          ];

          // Watch for resize event
          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render(scope.data);
          });
          var fill = d3.scale.category20();

          scope.render = function(data) {
            // remove all previous items before render
            svg.selectAll('*').remove();
            // If we don't pass any data, return out of the element
            if (!data) return;
            console.log(data);


            var renderTimeout = $timeout(function () {

            }, 200);

            if (renderTimeout) clearTimeout(renderTimeout);
          }

      }
    }
  }])
};
