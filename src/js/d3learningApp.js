'use strict';


require('./home');
require('./bars');
require('./tags');
require('./d3');

var app = angular.module('d3learningApp',['ui.router','d3','d3Home','d3Bars','d3Tags']);

require('./routes')(app);
require('./constants')(app);