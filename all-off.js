'use strict';

var Eventable = require('./eventable');
var removeAllListeners = Eventable().methods.removeAllListeners;

module.exports = function (emitter/*, type*/) {
	var type = arguments[1];
  return removeAllListeners.call(emitter, type);
};
