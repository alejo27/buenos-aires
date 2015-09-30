var foursquare = require('./foursquare.url');
var wikipedia = require('./wikipedia.url');
var infoWindow = require('./info-window.html');
var place = require('./place.html');

var _ = require('lodash');
_.templateSettings = {
  evaluate:    /{{([\s\S]+?)}}/g,
  interpolate: /{{([\s\S]+?)}}/g
};

module.exports.foursquareApi = _.template(foursquare);
module.exports.wikipediaApi = _.template(wikipedia);
module.exports.infoWindowTmpl = infoWindow;
module.exports.placeTmpl = _.template(place);
