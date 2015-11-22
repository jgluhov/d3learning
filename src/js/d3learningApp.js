'use strict';

require('./home');
require('./bars');
require('./d3');

var app = angular.module('d3learningApp',['ui.router','d3','d3Home','d3Bars']);

require('./routes')(app);