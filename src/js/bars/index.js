'use strict';

var app = angular.module('d3Bars',[]);

require('./BarsService')(app);
require('./BarsDirective')(app);
require('./BarsController')(app);

module.exports = app;
