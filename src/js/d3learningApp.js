'use strict';

require('./home');
require('./d3');

var app = angular.module('d3learningApp',['ui.router','d3','d3Home']);

require('./routes')(app);