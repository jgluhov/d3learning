'use strict';

module.exports = function (app) {
  app.directive('bars', ['$window', '$timeout', function ($window, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        data: '=', //bi-directional data-binding
        onClick: '&'
      },
      link: function (scope, element, attrs) {

          var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(element[0])
            .append("svg")
            .style('width', '100%');

          // Browser onresize event
          $window.onresize = function () {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render(scope.data);
          });

          scope.$watch('data', function (newData) {
            return scope.render(newData);
          }, true);

          scope.render = function (data) {
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            var renderTimeout = $timeout(function () {
              // setup variables
              var width = d3.select(element[0]).node().offsetWidth - margin,
              // calculate the height
                height = scope.data.length * (barHeight + barPadding),
              // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
              // our xScale
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function (d) {
                    return d.score;
                  })])
                  .range([0, width]);

              // set the height based on the calculations above
              svg.attr('height', height);

              // create the rectangles for the bar chart
              svg.selectAll('rect')
                .data(data).enter()
                .append('rect')
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin / 2))
                .attr('y', function (d, i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function (d) {
                  return color(d.score);
                })
                .on('click', function (d, i) {
                  return scope.onClick({item: d})
                })
                .transition().duration(1000).attr('width', function (d) {
                  return xScale(d.score)
                });

              svg.selectAll('text')
                .data(data).enter()
                .append('text')
                .attr('fill', '#fff')
                .attr('y', function (d, i) {
                  return i * (barHeight + barPadding) + 15;
                })
                .attr('x', 15)
                .text(function (d) {
                  return d.name + " (scored: " + d.score + ")";
                })
            }, 200);

            if (renderTimeout) clearTimeout(renderTimeout);
          }

      }
    }
  }])
};
