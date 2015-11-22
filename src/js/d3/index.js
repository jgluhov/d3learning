var app = angular.module('d3',[]);

require('./d3Service')(app);
require('./d3BarsDirective')(app);

module.exports = app;
