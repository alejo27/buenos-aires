var _ = require('lodash');
var ko = require('knockout');
var Landmark = require('./landmark');

/**
 * The ViewModel that represents the main page.
 * @constructor
 * @param {object} map - The map object that will be rendered on the page
 */
module.exports = function(map) {
	var self = this;

  // The set of landmarks to display
  var landmarks = [
    new Landmark({name: 'Casa Rosada', lat: -34.608091, lon: -58.370418, map: map}),
    new Landmark({name: 'La Boca', lat: -34.635241, lon: -58.364731, map: map}),
    new Landmark({name: 'Palermo Soho', lat: -34.587859, lon: -58.427603, map: map}),
    new Landmark({name: 'Plaza de Mayo', lat: -34.608727, lon: -58.371482, map: map}),
    new Landmark({name: 'Teatro Colón', lat: -34.601317, lon: -58.383545, map: map})
  ];

	self.query = ko.observable();
	self.landmarkList = ko.observableArray([]);
	self.currentLandmark = ko.observable();

  _.forEach(landmarks, function(l) {
    l.marker.addListener('click', function() {
      self.select(l);
    });

    l.selected.subscribe(function(isSelected) {
      l.marker.setAnimation(isSelected ? google.maps.Animation.BOUNCE : null);
      if (isSelected) {
        self.currentLandmark(l);
        l.showInfo();
      } else {
        l.hideInfo();
      }
    });
  });

  self.select = function(a) {
    _.forEach(landmarks, function(l) {
      l.selected(false);
    });
    a.selected(true);
  };

  /**
   * Search on the list of Landmarks for the ones that match the text being
   * entered by the user. It will filter the list to display only those that
   * match. If the text is empty, all Landmarks will be displayed.
   */
	self.search = function() {
    self.clean();

    var matches = _.filter(landmarks, function(l) {
      return l.contains(query());
    });

    _.forEach(matches, function(l) {
      l.marker.setMap(map);
      landmarkList.push(l);
    });
	};

  /**
   * Clean the observable list of Landmarks and remove all markers from the map
   */
	self.clean = function() {
    _.forEach(landmarks, function(l) {
      l.marker.setMap(null);
    });
    self.landmarkList.removeAll();
	};
};
