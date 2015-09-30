var style = require('../scss/style.scss');
var map = require('./map')();
var viewModel = require('./viewmodel')(map);
var ko = require('knockout');
var $ = require('jquery');

/** bootstrap the page */
$(document).ready(function() {
  ko.applyBindings(viewModel);
});
