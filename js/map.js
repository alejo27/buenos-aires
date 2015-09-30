var $ = require("jquery");

/* Map initialization properties */
var mapOptions = {
  center: new google.maps.LatLng(-34.6079958, -58.3766988),
  disableDoubleClickZoom: true,
  keyboardShortcuts: false,
  mapTypeControl: false,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  panControl: false,
  scaleControl: true,
  streetViewControl: false,
  styles: [{
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    }],
  zoom: 14
};

/**
 * This is the map that we will display on the page
 * @constructor
 */
module.exports = function() {
	return new google.maps.Map($('#js-map-canvas')[0], mapOptions);
};
