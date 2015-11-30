'use strict';

module.exports = function (app) {
  app.directive('tags',
    ['$window', '$timeout', '$templateCache', '$compile', 'tagsConstant', 'tagsService',
      function ($window, $timeout, $templateCache, $compile, tagsConstant, tagsService) {
        return {
          restrict: 'EA',
          scope: {
            source: '&',
            data: '=',
            limit: '=',
            // EventCallbacks
            onClick: "&",
            onHover: "&",
            onSearch: "&"
          },
          controller: function ($scope) {
            $scope.tags = '';

            $scope.search = function (text) {
              console.log(text)
            };

            $scope.click = function (tag) {
              $scope.$apply(function () {
                $scope.tags = parse($scope.tags, tag);
              })
            };

            function parse(text, tag) {
              var trimmed = _.trim(tag.text, '# ').toLowerCase();

              if (_.isEmpty(text)) return trimmed;
              if (text.indexOf(trimmed) > -1) return text;

              var tags = text.split(',');
              tags.push(trimmed);

              return _.map(tags, function (t) {
                return _.trim(t);
              }).join(', ');
            }

          },
          link: function (scope, element, attrs) {
            var limit, data, language;

            angular.isDefined(scope.limit) == true ? limit = scope.limit : limit = tagsConstant.tags.max;

            angular.isDefined(scope.data) == true && _.isArray(scope.data) == true ?
              data = _.shuffle(scope.data) : data = [];

            language = tagsConstant.language.default.toLowerCase();

            var svg = d3.select(element[0])
              .append("svg")
              .style('width', '100%').style('height', '100%')
              .attr('class', 'tags');

            svg.append("g").attr("class", "up");
            svg.append("g").attr("class", "input");
            svg.append("g").attr("class", "down");

            // Browser onresize event
            $window.onresize = tagsService.debouncer(function ($event) {
              scope.display();
              scope.$apply();
            });

            scope.render = function (data) {
              if (_.isEmpty(data)) return;

              data = _.chunk(data, data.length / 2);

              var w = element.parent()[0].clientWidth;
              var h = element.parent()[0].clientHeight;

              // remove all previous items before render
              d3.select(".up").selectAll('*').remove();
              d3.select(".down").selectAll('*').remove();
              d3.select(".input").selectAll('*').remove();

              d3.select(".tags > .input").append("foreignObject")
                .attr("width", w)
                .append("xhtml:body")
                .style("padding-top", h / 2 - 20 + "px")
                .attr("class", "uk-container-center");

              element.find('body').append($compile($templateCache.get('cloud-input-template'))(scope));

              var layoutUp = d3.layout.cloud()
                .size([w, 100])
                .words(data[0].map(function (d) {
                  return {text: '# ' + d.name.toUpperCase(), size: 15 + Math.random() * 15, power: d.power};
                }))
                .padding(5)
                .rotate(function () { return 0; })
                .font("Ubuntu")
                .fontSize(function (d) { return d.size; })
                .on("end", drawUp);

              function drawUp(words) {
                d3.select(".tags > .down")
                  .attr("width", layoutUp.size()[0])
                  .attr("height", layoutUp.size()[1])
                  .append("g")
                  .attr("transform", "translate(" + layoutUp.size()[0] / 2 + "," + (layoutUp.size()[1] / 2 + layoutUp.size()[1] / 4) + ")")
                  .selectAll("text")
                  .data(words)
                  .enter().append("text")
                  .style("font-size", function (d) { return d.size + "px"; })
                  .style("font-family", "Ubuntu")
                  .style("fill", function (d) { return d.power >= 0 ? '#ffffff' : '#faab9d'; })
                  .on("click", function (d) {
                    scope.click(d);
                    scope.onClick({element: d});
                  })
                  .on("mouseover", function (d) { scope.onHover({element: d}); })
                  .style("cursor", "pointer")
                  .style("font-weight", "100")
                  .style("opacity", 1e-6)
                  .transition()
                  .duration(1000).style("opacity", 1)
                  .attr("text-anchor", "middle")
                  .attr("transform", function (d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                  .text(function (d) { return d.text; })
              }

              var layoutDown = d3.layout.cloud()
                .size([w, 100])
                .words(data[1].map(function (d) {
                  return {text: '# ' + d.name.toUpperCase(), size: 15 + Math.random() * 10, power: d.power};
                }))
                .padding(5)
                .rotate(function () { return 0; })
                .font("Ubuntu")
                .fontSize(function (d) { return d.size; })
                .on("end", drawDown);

              function drawDown(words) {
                d3.select(".tags > .down")
                  .attr("width", layoutDown.size()[0])
                  .attr("height", layoutDown.size()[1])
                  .append("g")
                  .attr("transform", "translate(" + layoutDown.size()[0] / 2 + "," + (layoutDown.size()[1] + 150) + ")")
                  .selectAll("text")
                  .data(words)
                  .enter().append("text")
                  .style("font-size", function (d) { return d.size + "px"; })
                  .style("font-family", "Ubuntu")
                  .style("fill", function (d) { return d.power >= 0 ? '#ffffff' : '#faab9d'; })
                  .on("click", function (d) {
                    scope.click(d);
                    scope.onClick({element: d});
                  })
                  .on("mouseover", function (d) { scope.onHover({element: d}); })
                  .style("cursor", "pointer")
                  .style("font-weight", "100")
                  .style("opacity", 1e-6)
                  .transition()
                  .duration(1000).style("opacity", 1)
                  .attr("text-anchor", "middle")
                  .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function (d) { return d.text; })
              }

              layoutUp.start();
              layoutDown.start();
            };

            scope.change = function (text) {
              scope.display(text);
            };

            scope.display = function (text) {
              if (_.isUndefined(text)) _.isEmpty(scope.tags) == true ? text = '' : text = scope.tags;

              if (!_.isEmpty(data)) return scope.render(data);

              scope.source({text: text, language: language, limit: limit})
                .then(function (data) {
                  scope.render(data);
                });
            };

            scope.display();
          }
        }
      }]);
};
