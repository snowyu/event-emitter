// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var Eventable, base, create, defineProperties, descriptors, exports, methods;

  Eventable = require('./eventable');

  methods = Eventable().methods;

  create = Object.create;

  defineProperties = Object.defineProperties;

  descriptors = {
    on: {
      value: methods.on
    },
    once: {
      value: methods.once
    },
    off: {
      value: methods.off
    },
    emit: {
      value: methods.emit
    }
  };

  base = defineProperties({}, descriptors);

  exports = module.exports = function(o) {
    if (o == null) {
      return create(base);
    } else {
      return defineProperties(Object(o), descriptors);
    }
  };

  exports.methods = methods;

}).call(this);
