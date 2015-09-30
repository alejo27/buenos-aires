var wpApi = require('../templates/templates').wikipediaApi;
var fsApi = require('../templates/templates').foursquareApi;

/* Set of default params to call Foursquare's API */
var foursquareParams = {
  clientId: 'CVUFQS50V3O2YECIMXG2Z4RRWQ4AW54C5P5BZ0COXGFKTFV2',
  clientSecret: 'QJAX1EP0DPIDCSZWQIFUFBCC3ET0CKX02BCEB4XGAQZPJ2DE',
  country: 'Argentina',
  limit: 5,
  section: 'drinks',
  version: 20130815
};

/* Set of default params to call Wikipedia's API */
var wikipediaParams = {
  action: 'query',
  prop: 'extracts',
  format: 'json'
};

/**
 * Call Foursquare's API with the specified parameters
 * @param {object} params - An object with the parameters for the call
 * @param {object} params.landmark - The name of the Landmark to explore around
 */
module.exports.foursquare = function(params) {
  return fsApi(_.merge({}, foursquareParams, params));
};

/**
 * Call Wikipedia's API with the specified parameters
 * @param {object} params - An object with the parameters for the call
 * @param {object} params.landmark - The name of the Landmark to explore around
 */
module.exports.wikipedia = function(params) {
  return wpApi(_.merge({}, wikipediaParams, params));
};
