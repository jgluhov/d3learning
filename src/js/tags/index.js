'use strict';

var app = angular.module('d3Tags',[]);

require('./tagsService')(app);
require('./tagsDirective')(app);
require('./tagsController')(app);

module.exports = app;
