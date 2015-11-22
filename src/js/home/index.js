var app = angular.module('d3Home',[]);

require('./homeService')(app);
require('./homeController')(app);

module.exports = app;
