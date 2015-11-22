module.exports = function(app) {
  app.controller('homeController', ['$scope', function ($scope) {
    console.log('homeController');
  }]);
};
