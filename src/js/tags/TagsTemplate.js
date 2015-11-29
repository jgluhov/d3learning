module.exports = function(app) {
  app.run(['$templateCache', function($templateCache) {
    $templateCache.put('cloud-input-template',
      "<form class='uk-form uk-text-center'>" +
        "<div class='uk-form-row uk-width-8-10 uk-container-center'>" +
          "<div class='uk-form-icon cloud-form-icon' style='width: 100%;'>" +
            "<div class='uk-icon-hover uk-icon-at'></div>" +
            "<input class='uk-form-large tm-form-cloud' ng-model='tags' ng-change='change(tags)' placeholder='How?' focus='true'>" +
            "<div class='uk-icon-right uk-icon-search' ng-click='search(tags)'></div>" +
          "</div>" +
        "</div>" +
      "</form>")
  }]);
};