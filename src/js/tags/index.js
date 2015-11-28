'use strict';

var app = angular.module('d3Tags',['ngResize','debounce']);

require('./tagsTemplate')(app);
require('./tagsDirective')(app);
require('./tagsController')(app);

module.exports = app;
