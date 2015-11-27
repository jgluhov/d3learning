'use strict';

module.exports = function (app) {
  app.directive('tags', ['$window', '$timeout', function ($window, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        source: '='
      },
      link: function (scope, element, attrs) {
        var container = $('.tags-content');
        var svg = d3.select(element[0])
          .append("svg")
          .style('width', '100%')
          .attr('class', 'svg-tags');

        var h = container.innerHeight();

        // Browser onresize event
        $window.onresize = function () {
          scope.$apply();
        };

        // hard-code data
        scope.data = [
          {name: "Greg" },
          {name: "Ari"},
          {name: 'Q'},
          {name: "Loser"}
        ];

        scope.render = function (data) {
          // remove all previous items before render

          // If we don't pass any data, return out of the element
          if (!data) return;


          var renderTimeout = $timeout(function () {
            svg.selectAll('*').remove();
            // setup variables
            var w = container.innerWidth();

            var fill = d3.scale.category20();

            var layout = d3.layout.cloud()
              .size([w, h])
              .words(scope.data.map(function(d) {
                return {text: '#' + d.name, size: 18 };
              }))
              .padding(10)
              .rotate(function() { return 0; })
              .font("Ubuntu")
              .fontSize(function(d) { return d.size; })
              .on("end", draw);

            layout.start();

            function draw(words) {
              svg
                .attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Ubuntu")
                .style("fill", '#ffffff')
                .style("opacity", 1e-9)
                .transition()
                .duration(1000)
                .style("opacity", 1)
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
            }
            // Code here

          }, 200);

          if (renderTimeout) clearTimeout(renderTimeout);
        };

        scope.render(scope.data);

        // Watch for resize event
        scope.$watch(function () {
          return angular.element($window)[0].innerWidth;
        }, function (newVal, oldVal) {
          if(newVal !== oldVal) scope.render(scope.data);
        });
        //
        //// Watch for resize event
        //scope.$watch(function () {
        //  return angular.element($window)[0].innerHeight;
        //}, function (newVal, oldVal) {
        //  if(newVal !== oldVal) scope.render(scope.data);
        //});


      }
    }
  }])
};
