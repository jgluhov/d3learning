'use strict';

module.exports = function (app) {
  app.controller('tagsController', ['$scope', '$http', 'constants', function ($scope, $http, constants) {
    $scope.greeting = 'D3Tags example';

    var positive = 1;
    var negative = -1;

    $scope.data = [
      {name: "Новое", power: positive},
      {name: "Модно", power: positive},
      {name: "Стильно", power: positive},
      {name: "Смешно", power: positive},
      {name: "Интересно", power: positive},
      {name: "Вкусно", power: positive},
      {name: "Быстро", power: positive},
      {name: "Красиво", power: positive},
      {name: "Качественно", power: positive},
      {name: "Функционально", power: positive},
      {name: "Грязно", power: negative},
      {name: "Скучно", power: negative},
      {name: "Отвратительно", power: negative},
      {name: "Мерзко", power: negative},
      {name: "Уныло", power: negative},
      {name: "Дорого", power: negative},
      {name: "Кошмарно", power: negative},
      {name: "Грубо", power: negative},
      {name: "Ужасно", power: negative},
      {name: "Безвкусно", power: negative}
    ];

    $scope.loadTags = function (text, lang_code, limit) {
      if (_.isUndefined(text)) text = '';

      return $http.get(constants.production + 'emotions?cloud=true&name=' + text + '&lang_code=' + lang_code +
        '&limit=' + limit + '&token=' + constants.token).then(function (res) {
        return res.data;
      })
    };

    $scope.clickTag = function (element) {
      console.log(element)
    };

    $scope.hoverTag = function (element) {
      console.log(element)
    };

  }]);
};
