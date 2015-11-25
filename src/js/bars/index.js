'use strict';

var app = angular.module('d3Bars',[]);

require('./barsService')(app);
require('./barsDirective')(app);
require('./barsController')(app);

module.exports = app;
