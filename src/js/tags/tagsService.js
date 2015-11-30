module.exports = function (app) {
  app.service('tagsService', [function () {
    var self = this;

    self.debouncer = function(func, timeout) {
      var timeoutID, timeout = timeout || 300;
      return function () {
        var scope = this, args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function () {
          func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
      }
    }
  }])
};
