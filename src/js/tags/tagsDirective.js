'use strict';

module.exports = function (app) {

  app.directive('tags',
    ['$window', '$timeout', '$templateCache', '$compile',
      function ($window, $timeout, $templateCache, $compile) {
        return {
          restrict: 'EA',
          scope: {
            source: '&',
            data: '=',
            // EventCallbacks
            onClick: "&",
            onHover: "&",
            onSearch: "&"
          },
          controller: function ($scope) {
            $scope.tags = '';

            $scope.change = function (text) {
              console.log(text)
            };

            $scope.search = function (text) {
              console.log(text)
            };

            $scope.click = function (tag) {
              var tags = $scope.tags.split(',');
              var text = _.trim(tag.text, '# ').toLowerCase();
              $scope.$apply(function() {
                $scope.tags = text
              })
            }
          }
          ,
          link: function (scope, element, attrs) {
            var svg = d3.select(element[0])
              .append("svg")
              .style('width', '100%').style('height', '100%')
              .attr('class', 'tags');

            svg.append("g").attr("class", "up");
            svg.append("g").attr("class", "input");
            svg.append("g").attr("class", "down");

            function debouncer(func, timeout) {
              var timeoutID, timeout = timeout || 300;
              return function () {
                var scope = this, args = arguments;
                clearTimeout(timeoutID);
                timeoutID = setTimeout(function () {
                  func.apply(scope, Array.prototype.slice.call(args));
                }, timeout);
              }
            }

            // Browser onresize event
            $window.onresize = debouncer(function ($event) {
              scope.source().then(function (data) {
                scope.render(data);
              });
              scope.$apply();
            });

            scope.render = function (data) {
              // If we don't pass any data, return out of the element
              if (!data) return;

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
                .style("width", "uk-width-8-10")
                .attr("class", "uk-container-center");

              element.find('body').append($compile($templateCache.get('cloud-input-template'))(scope));

              var layoutUp = d3.layout.cloud()
                .size([w, 100])
                .words(data[0].map(function (d) {
                  return {text: '# ' + d.name.toUpperCase(), size: 15 + Math.random() * 15, power: d.power};
                }))
                .padding(5)
                .rotate(function () {
                  return 0;
                })
                .font("Ubuntu")
                .fontSize(function (d) {
                  return d.size;
                })
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
                  .style("font-size", function (d) {
                    return d.size + "px";
                  })
                  .style("font-family", "Ubuntu")
                  .style("fill", function (d) {
                    return d.power >= 0 ? '#ffffff' : '#faab9d';
                  })
                  .on("click", function (d) {
                    console.log(d)
                    scope.click(d);
                    scope.onClick({element: d});
                  })
                  .on("mouseover", function (d) {
                    scope.onHover({element: d});
                  })
                  .style("cursor", "pointer")
                  .style("font-weight", "100")
                  .style("opacity", 1e-6)
                  .transition()
                  .duration(1000).style("opacity", 1)
                  .attr("text-anchor", "middle")
                  .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function (d) {
                    return d.text;
                  })
              }

              var layoutDown = d3.layout.cloud()
                .size([w, 100])
                .words(data[1].map(function (d) {
                  return {text: '# ' + d.name.toUpperCase(), size: 15 + Math.random() * 10, power: d.power};
                }))
                .padding(5)
                .rotate(function () {
                  return 0;
                })
                .font("Ubuntu")
                .fontSize(function (d) {
                  return d.size;
                })
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
                  .style("font-size", function (d) {
                    return d.size + "px";
                  })
                  .style("font-family", "Ubuntu")
                  .style("fill", function (d) {
                    return d.power >= 0 ? '#ffffff' : '#faab9d';
                  })
                  .on("click", function (d) {
                    scope.click(d);
                    scope.onClick({element: d});
                  })
                  .on("mouseover", function (d) {
                    scope.onHover({element: d});
                  })
                  .style("cursor", "pointer")
                  .style("font-weight", "100")
                  .style("opacity", 1e-6)
                  .transition()
                  .duration(1000).style("opacity", 1)
                  .attr("text-anchor", "middle")
                  .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .text(function (d) {
                    return d.text;
                  })
              }

              layoutUp.start();
              layoutDown.start();
            };

            if (angular.isDefined(scope.data) && scope.data.length > 2) {
              scope.render(_.shuffle(scope.data));
            } else {
              scope.source().then(function (data) {
                scope.render(data);
              });
            }
          }
        }
      }]);
};
