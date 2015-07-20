// Generated by CoffeeScript 1.9.0
(function() {
  'use strict';
  var create, customAbility, defaultMethods, defineProperty, getEventableClass, hasOwnProperty, isArray, isFunction, isNumber, isObject, isUndefined;

  customAbility = require('custom-ability');

  isFunction = require('util-ex/lib/is/type/function');

  isObject = require('util-ex/lib/is/type/object');

  isNumber = require('util-ex/lib/is/type/number');

  isUndefined = require('util-ex/lib/is/type/undefined');

  isArray = require('util-ex/lib/is/type/array');

  defineProperty = require('util-ex/lib/defineProperty');

  defaultMethods = require('./default-methods');

  hasOwnProperty = Object.prototype.hasOwnProperty;

  create = Object.create;

  getEventableClass = function(aClass, aOptions) {
    var Eventable;
    return Eventable = (function() {
      var methods;

      function Eventable() {}

      if (aClass == null) {
        aClass = Eventable;
      }

      defineProperty(Eventable, 'methods', methods = defaultMethods(aClass));

      Eventable.defaultMaxListeners = 10;

      Eventable.listenerCount = methods.listenerCount;

      Eventable.prototype.emit = methods.emit;

      Eventable.prototype.on = methods.on;

      Eventable.prototype.addListener = methods.on;

      Eventable.prototype.off = methods.off;

      Eventable.prototype.removeListener = methods.off;

      Eventable.prototype.removeAllListeners = methods.removeAllListeners;

      Eventable.prototype.once = methods.once;

      Eventable.prototype.setMaxListeners = methods.setMaxListeners;

      Eventable.prototype.listeners = methods.listeners;

      return Eventable;

    })();
  };

  module.exports = customAbility(getEventableClass, true);

}).call(this);
