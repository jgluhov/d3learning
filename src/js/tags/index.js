'use strict';

var app = angular.module('d3Tags',[]);

require('./tagsConstants')(app);
require('./tagsService')(app);
require('./focusDirective')(app);
require('./tagsTemplate')(app);
require('./tagsDirective')(app);
require('./tagsController')(app);

module.exports = app;
