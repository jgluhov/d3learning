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
          .style('height', '100%')
          .attr('class', 'tags');
        svg.append("g").attr("class","up");
        svg.append("g").attr("class","input");
        svg.append("g").attr("class","down");


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

        scope.random = function(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min
        };

        scope.render = function (data) {
          // If we don't pass any data, return out of the element
          if (!data) return;

          var renderTimeout = $timeout(function () {
            var w = container.innerWidth();
            var h = container.innerHeight();

            // remove all previous items before render
            d3.select(".up").selectAll('*').remove();
            d3.select(".down").selectAll('*').remove();
            d3.select(".input").selectAll('*').remove();

            d3.select(".tags > .input").append("foreignObject")
              .attr("width", w)
              .append("xhtml:body")
              .style("padding-top", h/2 - 20 + "px")
              .style("width", "uk-width-8-10")
              .attr("class", "uk-container-center")
              .html(
              "<form class='uk-form uk-text-center'>" +
              "<div class='uk-form-row uk-width-8-10 uk-container-center'>" +
                "<div class='uk-form-icon cloud-form-icon' style='width: 100%;'>" +
                  "<div class='uk-icon-hover uk-icon-at'></div>" +
                  "<input class='uk-form-large tm-form-large' style='position: relative; width: 100%;' placeholder='How?'>" +
                  "<div class='uk-icon-hover uk-icon-right uk-icon-search'></div>" +
                "</div>" +
              "</div>" +
              "</form>");

            var layoutUp = d3.layout.cloud()
              .size([w, 100])
              .words([
                "perfect", "invulnerable", "sad", "depressing", "stubborn", "gratis", "fidgety",
                "helpless", "cruel"].map(function(d) {
                  return {text: '# ' + d.toUpperCase(), size: 14 + Math.random() * 15, power: scope.random(-10, 10)};
                }))
              .padding(5)
              .rotate(function() { return 0; })
              .font("Ubuntu")
              .fontSize(function(d) { return d.size; })
              .on("end", drawUp);

            var layoutDown = d3.layout.cloud()
              .size([w, 100])
              .words([
                "stupid", "chaotic", "disaster", "angelic", "subconscious", "hypocritical", "harmonious",
                "generous", "unnatural"].map(function(d) {
                  return {text: '# ' + d.toUpperCase(), size: 15 + Math.random() * 10, power: scope.random(-10, 10)};
                }))
              .padding(5)
              .rotate(function() { return 0; })
              .font("Ubuntu")
              .fontSize(function(d) { return d.size; })
              .on("end", drawDown);

            layoutUp.start();
            layoutDown.start();

            function drawUp(words) {
              d3.select(".tags > .up")
                .attr("width", layoutUp.size()[0])
                .attr("height", layoutUp.size()[1])
                .append("g")
                .attr("transform", "translate(" + layoutUp.size()[0] / 2 + "," + (layoutUp.size()[1]/2 +  layoutUp.size()[1]/4) + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-weight","100")
                .style("font-family", "Ubuntu")
                .style("fill", function(d) {
                  return d.power >= 0 ? '#ffffff' : '#faab9d';
                })
                .style("opacity", 1e-6)
                .transition()
                .duration(1000).style("opacity", 1)
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
            }
            function drawDown(words) {
              d3.select(".tags > .down")
                .attr("width", layoutDown.size()[0])
                .attr("height", layoutDown.size()[1])
                .append("g")
                .attr("transform", "translate(" + layoutDown.size()[0] / 2 + "," + (layoutDown.size()[1] + 150) + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Ubuntu")
                .style("fill", function(d) {
                  return d.power >= 0 ? '#ffffff' : '#faab9d';
                })
                .style("font-weight","100")
                .style("opacity", 1e-6)
                .transition()
                .duration(1000).style("opacity", 1)
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
            }


            console.log(data);

          }, 200);

          if (renderTimeout) clearTimeout(renderTimeout);
        };

        scope.render(scope.data);

        // Watch for resize event
        scope.$watch(function () {
          return angular.element($window)[0].innerWidth;
        }, function (newVal, oldVal) {
          if(newVal !== oldVal)
            scope.render(scope.data);
        });

        // Watch for resize event
        scope.$watch(function () {
          return angular.element($window)[0].innerHeight;
        }, function (newVal, oldVal) {
          if(newVal !== oldVal)
            scope.render(scope.data);
        });

      }
    }
  }])
};
