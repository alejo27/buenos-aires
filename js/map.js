var $ = require("jquery");

/**
 * This is the map that we will display on the page
 * @constructor
 */
module.exports = function() {
  if (typeof(google) == 'undefined') {
    alert('Unable to load the map at this time. Please try later.');
    return {};
  }

  try {
    return new google.maps.Map($('#js-map-canvas')[0], {
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
    });
  } catch (e) {
    alert('Unable to load the map at this time. Please try later.');
  }
};
