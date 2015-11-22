module.exports = function (app) {
  app.controller('barsController', ['$scope', 'barsService', function ($scope, homeService) {
    $scope.greeting = 'D3Bars example';

    homeService.getData().then(function (data, status) {
      var entries = data.data.responseData.feed.entries,
        wordFreq = {},
        data = [];

      angular.forEach(entries, function (article) {
        angular.forEach(article.content.split(' '), function (word) {
          if (word.length > 3) {
            if (!wordFreq[word]) {
              wordFreq[word] = {score: 0, link: article.link};
            }
            wordFreq[word].score += 1;
          }
        });
      });

      for (key in wordFreq) {
        data.push({
          name: key,
          score: wordFreq[key].score,
          link: wordFreq[key].link
        })
      }

      data.sort(function (a, b) {
        return b.score - a.score;
      });
      $scope.data = data.slice(0, 5);
    });

    $scope.d3OnBarsClick = function (item) {
      console.log(item)
    };

  }]);
};
