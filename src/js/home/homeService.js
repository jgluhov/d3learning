module.exports = function (app) {
  app.service('homeService', ['$http', function ($http) {
    var self = this;
    self.getData = function() {
      return $http({
        method: 'JSONP',
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=JSON_CALLBACK&num=10&q=' +
          encodeURIComponent('http://sports.espn.go.com/espn/rss/espnu/news')
      })
    }
  }])
};
