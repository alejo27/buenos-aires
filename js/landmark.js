var _ = require('lodash');
var $ = require('jquery');
var ko = require('knockout');
var api = require('./api');

/**
 * A Landmark is an object that holds information about a place on the map.
 * It will create a Marker on the map, and also display information on a InfoWindow
 * when it is selected. The information displayed is queried from several APIs.
 * @constructor
 */
module.exports = function(data) {
	var self = this;
  var infoWindow;
  var infoWindowTmpl = require('../templates/templates').infoWindowTmpl;
  var placeTmpl = require('../templates/templates').placeTmpl;

  self.marker;
	self.name = data.name;
	self.selected = ko.observable(false);

  /**
   * This method initialize a Landmark by:
   * a) Creating a Marker to place into the map. The Marker will handle events
   *    to display info about the Landmark.
   * b) Creat an InfoWindow to display contextual information about the Landmark.
   */
	self.init = function() {
		self.marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
			map: data.map,
			position: new google.maps.LatLng(data.lat, data.lon)
		});

    infoWindow = new google.maps.InfoWindow({
      content: infoWindowTmpl
    });
    infoWindow.addListener('closeclick', function() {
      self.selected(false);
    });
	};

  /**
   * Whether or not this Landmark's name contains the specified text.
   * @param {string} txt - The text to match the name against.
   */
  self.contains = function(txt) {
    var q = _.isUndefined(txt) ? '' : txt.toLowerCase();
    return data.name.toLowerCase().indexOf(q) >= 0;
  }

	// Add infowindow to the view
	self.showInfo = function() {
    var params = {landmark: self.name};

    var foursquare = $.getJSON(api.foursquare(params)).pipe(function(data) {
      return data.response.groups[0].items;
    });

    var wikipedia = $.ajax(api.wikipedia(params), {dataType: 'jsonp'}).pipe(function (data) {
      // filter the results and return the first page
      var reslut = {};
      var keys = Object.keys(data.query.pages);

      for (var i = 0; i < keys.length; i++) {
        if (_.isFinite(_.parseInt(keys[i]))) {
          result = data.query.pages[keys[i]].extract;
          break;
        }
      }
      return result;
    });

    $.when(foursquare, wikipedia).done(function() {
      infoWindow.open(data.map, self.marker);
    }).then(function(links, info) {
      self.render(links, info);
    }, function() {
      alert('Could not contact the server. Please try later.');
    });
	};

	self.hideInfo = function() {
		infoWindow.close();
	};

  self.render = function(links, info) {
    $('.info-window h1').text(self.name);
    $('.info-window .info').html(info);
    if ($('#js-explore-list li').length == 0) {
      var lis = []; // store the LI elements first
      _.forEach(links, function(i) {
        var params = {
          url: i.venue.url || '#',
          name: i.venue.name,
          category: i.venue.categories[0].name
        };
        lis.push(placeTmpl(params));
      });
      $('#js-explore-list').append(lis);
    }
    data.map.setCenter(self.position);
  }

	self.init();
};
