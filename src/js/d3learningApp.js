'use strict';

require('./home');

var app = angular.module('d3learningApp',['ui.router','d3Home']);

require('./routes')(app);