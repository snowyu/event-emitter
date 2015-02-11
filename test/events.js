'use strict';

module.exports = function (events, t) {
  var result = {};
  var tests = {};
  result['listeners'] = require('./events-listeners')(events, t);
  result['remove listeners'] = require('./events-remove-listeners')(events, t);
  return result;
}


