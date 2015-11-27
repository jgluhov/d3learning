'use strict';

module.exports = function (app) {
  app.directive('tags', ['$window', '$timeout', function ($window, $timeout) {
    return {
      restrict: 'EA',
      scope: {},
      link: function (scope, element, attrs) {
        var container = $('.tags-content');
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
          {name: "Greg", value: "13" },
          {name: "Ari", value: "13" },
          {name: 'Q', value: "13"},
          {name: "Loser", value: "13"}
        ];

        scope.render = function (data) {
          // remove all previous items before render
          svg.selectAll('*').remove();
          // If we don't pass any data, return out of the element
          if (!data) return;


          var renderTimeout = $timeout(function () {
            // setup variables
            var h = container.innerHeight();
            var w = container.innerWidth();

            //var layout = d3.layout.cloud()
            //  .timeInterval(Infinity).size([w,h])
            //  .words(data)
            //  .padding(5)
            //  .font("Impact")
            //  .fontSize(function(d) {
            //    return d.value
            //  })
            //  .text(function(d) {
            //    return d.name
            //  })
            //  .on("end", function(data) {
            //    console.log(data)
            //  }).start();

            var fill = d3.scale.category20();

            var layout = d3.layout.cloud()
              .size([w, h])
              .words([
                "Hello", "world", "normally", "you", "want", "more", "words",
                "than", "this"].map(function(d) {
                return {text: d, size: 10 + Math.random() * 90, test: "haha"};
              }))
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw);

            layout.start();

            function draw(words) {
              svg
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", '#ffffff')
                .attr("text-anchor", "middle")
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

        // Watch for resize event
        scope.$watch(function () {
          return angular.element($window)[0].innerHeight;
        }, function (newVal, oldVal) {
          if(newVal !== oldVal) scope.render(scope.data);
        });


      }
    }
  }])
};
