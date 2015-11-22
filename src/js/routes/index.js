'use strict';

module.exports = function(app) {
  app.config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: "templates/home.html",
            controller: "homeController"
          })
          .state('bars', {
            url: '/bars',
            templateUrl: "templates/bars.html",
            controller: "barsController"
          })
      }
    ]
  );
};