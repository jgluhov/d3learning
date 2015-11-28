module.exports = function (app) {
  app.config(['resizeProvider', function (resizeProvider) {
    // set throttle time
    resizeProvider.throttle = 1000;
    // don't bind resize events on service innitialization
    resizeProvider.initBind = false;
  }]);
};
