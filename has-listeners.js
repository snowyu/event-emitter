'use strict';

var isEmpty = require('es5-ext/object/is-empty')
  , value   = require('es5-ext/object/valid-value')

  , hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (obj/*, type*/) {
	var type;
	value(obj);
	type = arguments[1];
	if (arguments.length > 1) {
		return hasOwnProperty.call(obj, '_events') && Boolean(obj._events[type]);
	}
	return obj.hasOwnProperty('_events') && !isEmpty(obj._events);
};
