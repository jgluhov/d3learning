module.exports = function(app) {
  app.constant('tagsConstant', {
    language: {
      default: 'EN'
    },
    tags: {
      limit: 10
    }
  })
};
