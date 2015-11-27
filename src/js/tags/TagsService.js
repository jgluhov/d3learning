'use strict';

module.exports = function (app) {
  app.service('tagsService', ['$http', 'constants', function ($http, constants) {
    var self = this;
    self.getData = function() {
      return $http.get(constants.production + 'emotions?cloud=true&lang_code=en&token=' + constants.token)
    }
  }])
};
