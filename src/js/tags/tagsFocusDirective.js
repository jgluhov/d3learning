module.exports = function(app) {
  app.directive('focus',
    function ($timeout) {
      var counter = 0;
      return {
        scope: {
          trigger: '@focus'
        },
        link: function (scope, element) {
          scope.$watch('trigger', function (value, oldval) {
            if (value === "true") {
              $timeout(function () { element[0].focus(); });
            }
            if (value === "skip" && counter > 0) {
              $timeout(function () { element[0].focus(); });
            }
            counter++;
          });
        }
      };
    }
  );
};
